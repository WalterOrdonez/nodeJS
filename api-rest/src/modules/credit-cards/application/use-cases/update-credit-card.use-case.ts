import { AppError } from "../../../../shared/errors/AppError";
import { CreditCard as CreditCardEntity } from "../../domain/credit-card.entity";
import type { CreditCardUpdate } from "../../domain/credit-card.entity";
import type { CreditCardRepository } from "../ports/credit-card.repository";

export class UpdateCreditCardUseCase {
    constructor(private readonly creditCardRepository: CreditCardRepository) {}

    async execute(
        id: string,
        data: CreditCardUpdate,
    ): Promise<CreditCardEntity> {
        const currentCard = await this.creditCardRepository.findById(id);
        if (!currentCard) throw new AppError("Tarjeta no encontrada", 404);

        const nextBrand = data.brand ?? currentCard.brand;
        const nextNumber = data.number ?? currentCard.number;
        if (!CreditCardEntity.isBrandNumberValid(nextBrand, nextNumber)) {
            throw new AppError(
                "El número de tarjeta no corresponde con la marca",
                400,
            );
        }

        const card = await this.creditCardRepository.update(id, data);
        if (!card) throw new AppError("Tarjeta no encontrada", 404);
        return card;
    }
}
