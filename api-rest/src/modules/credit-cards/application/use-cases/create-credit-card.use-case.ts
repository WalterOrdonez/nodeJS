import { AppError } from "../../../../shared/errors/AppError";
import { CreditCard } from "../../domain/credit-card.entity";
import type { CreditCardInput } from "../../domain/credit-card.entity";
import type { CreditCardRepository } from "../ports/credit-card.repository";

export class CreateCreditCardUseCase {
    constructor(private readonly creditCardRepository: CreditCardRepository) {}

    execute(data: Partial<CreditCardInput>): Promise<CreditCard> {
        if (!CreditCard.isValid(data)) {
            throw new AppError(
                "cardHolder, number, brand y expiration son requeridos",
                400,
            );
        }
        if (!CreditCard.isBrandNumberValid(data.brand, data.number)) {
            throw new AppError(
                "El número de tarjeta no corresponde con la marca",
                400,
            );
        }
        return this.creditCardRepository.create(data);
    }
}
