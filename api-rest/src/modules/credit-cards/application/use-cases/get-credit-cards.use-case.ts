import type { CreditCard } from "../../domain/credit-card.entity";
import type { CreditCardRepository } from "../ports/credit-card.repository";

export class GetCreditCardsUseCase {
    constructor(private readonly creditCardRepository: CreditCardRepository) {}

    execute(): Promise<CreditCard[]> {
        return this.creditCardRepository.findAll();
    }
}
