import { randomUUID } from "node:crypto";
import type { Repository } from "typeorm";
import { CreditCard } from "../../../domain/credit-card.entity";
import type {
    CreditCardInput,
    CreditCardUpdate,
} from "../../../domain/credit-card.entity";
import type { CreditCardRepository } from "../../../application/ports/credit-card.repository";
import { CreditCardOrmEntity } from "./credit-card.orm-entity";

export class TypeOrmCreditCardRepository implements CreditCardRepository {
    constructor(private readonly repository: Repository<CreditCardOrmEntity>) {}

    async findAll(): Promise<CreditCard[]> {
        const cards = await this.repository.find();
        return cards.map((card) => this.toDomain(card));
    }

    async findById(id: string): Promise<CreditCard | null> {
        const card = await this.repository.findOneBy({ id });
        return card ? this.toDomain(card) : null;
    }

    async create(data: CreditCardInput): Promise<CreditCard> {
        const entity = this.repository.create({ id: randomUUID(), ...data });
        const card = await this.repository.save(entity);
        return this.toDomain(card);
    }

    async update(
        id: string,
        data: CreditCardUpdate,
    ): Promise<CreditCard | null> {
        const entity = await this.repository.findOneBy({ id });
        if (!entity) return null;

        Object.assign(entity, data);
        const updated = await this.repository.save(entity);
        return this.toDomain(updated);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete({ id });
        return (result.affected ?? 0) > 0;
    }

    private toDomain(entity: CreditCardOrmEntity): CreditCard {
        return new CreditCard({
            id: entity.id,
            cardHolder: entity.cardHolder,
            number: entity.number,
            brand: entity.brand,
            expiration: entity.expiration,
        });
    }
}
