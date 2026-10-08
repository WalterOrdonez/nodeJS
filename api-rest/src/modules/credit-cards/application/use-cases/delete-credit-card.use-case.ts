import { AppError } from "../../../../shared/errors/AppError";
import type { CreditCardRepository } from "../ports/credit-card.repository";

export class DeleteCreditCardUseCase {
    constructor(private readonly creditCardRepository: CreditCardRepository) {}

    async execute(id: string): Promise<void> {
        const deleted = await this.creditCardRepository.delete(id);
        if (!deleted) throw new AppError("Tarjeta no encontrada", 404);
    }
}
