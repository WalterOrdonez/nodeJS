import { randomUUID } from "node:crypto";
import { CreditCard } from "../../../domain/credit-card.entity";
import type {
    CreditCardInput,
    CreditCardUpdate,
} from "../../../domain/credit-card.entity";
import type { CreditCardRepository } from "../../../application/ports/credit-card.repository";

export class InMemoryCreditCardRepository implements CreditCardRepository {
    private creditCards: CreditCard[] = [
        new CreditCard({
            id: "550e8400-e29b-41d4-a716-446655440000",
            cardHolder: "Juan Perez",
            number: "4111111111111111",
            brand: "Visa",
            expiration: "12/27",
        }),
        new CreditCard({
            id: "550e8400-e29b-41d4-a716-446655440001",
            cardHolder: "Maria Lopez",
            number: "5500000000000004",
            brand: "Mastercard",
            expiration: "08/26",
        }),
    ];

    async findAll(): Promise<CreditCard[]> {
        return this.creditCards;
    }

    async findById(id: string): Promise<CreditCard | null> {
        return this.creditCards.find((card) => card.id === id) ?? null;
    }

    async create(data: CreditCardInput): Promise<CreditCard> {
        const newCard = new CreditCard({
            id: randomUUID(),
            ...data,
        });
        this.creditCards.push(newCard);
        return newCard;
    }

    async update(
        id: string,
        data: CreditCardUpdate,
    ): Promise<CreditCard | null> {
        const card = await this.findById(id);
        if (!card) return null;
        Object.assign(card, data);
        return card;
    }

    async delete(id: string): Promise<boolean> {
        const index = this.creditCards.findIndex((card) => card.id === id);
        if (index === -1) return false;
        this.creditCards.splice(index, 1);
        return true;
    }
}
