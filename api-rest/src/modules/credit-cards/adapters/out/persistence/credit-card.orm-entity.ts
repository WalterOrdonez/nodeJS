import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "credit_cards" })
export class CreditCardOrmEntity {
    @PrimaryColumn("uuid")
    id!: string;

    @Column({ name: "card_holder", type: "text" })
    cardHolder!: string;

    @Column({ type: "varchar", length: 19 })
    number!: string;

    @Column({ type: "varchar", length: 20 })
    brand!: string;

    @Column({ type: "varchar", length: 5 })
    expiration!: string;
}
