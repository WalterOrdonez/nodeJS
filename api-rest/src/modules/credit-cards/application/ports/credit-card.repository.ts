import type {
    CreditCard,
    CreditCardInput,
    CreditCardUpdate,
} from "../../domain/credit-card.entity";

export interface CreditCardRepository {
    findAll(): Promise<CreditCard[]>;
    findById(id: string): Promise<CreditCard | null>;
    create(data: CreditCardInput): Promise<CreditCard>;
    update(id: string, data: CreditCardUpdate): Promise<CreditCard | null>;
    delete(id: string): Promise<boolean>;
}
