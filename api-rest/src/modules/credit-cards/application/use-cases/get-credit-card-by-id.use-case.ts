import { AppError } from "../../../../shared/errors/AppError";
import type { CreditCard } from "../../domain/credit-card.entity";
import type { CreditCardRepository } from "../ports/credit-card.repository";

export class GetCreditCardByIdUseCase {
    constructor(private readonly creditCardRepository: CreditCardRepository) {}

    async execute(id: string): Promise<CreditCard> {
        const card = await this.creditCardRepository.findById(id);
        if (!card) throw new AppError("Tarjeta no encontrada", 404);
        return card;
    }
}
