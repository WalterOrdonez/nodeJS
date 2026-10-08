export interface CreditCardInput {
    cardHolder: string;
    number: string;
    brand: string;
    expiration: string;
}

export type CreditCardUpdate = Partial<CreditCardInput>;

export interface CreditCardData extends CreditCardInput {
    id: string;
}

export class CreditCard implements CreditCardData {
    id: string;
    cardHolder: string;
    number: string;
    brand: string;
    expiration: string;

    constructor({ id, cardHolder, number, brand, expiration }: CreditCardData) {
        this.id = id;
        this.cardHolder = cardHolder;
        this.number = number;
        this.brand = brand;
        this.expiration = expiration;
    }

    static isValid(data: Partial<CreditCardInput>): data is CreditCardInput {
        return Boolean(
            data.cardHolder && data.number && data.brand && data.expiration,
        );
    }

    static isBrandNumberValid(brand: string, number: string): boolean {
        const normalizedBrand = brand.trim().toLowerCase();
        const firstTwoDigits = Number(number.slice(0, 2));
        const firstThreeDigits = Number(number.slice(0, 3));
        const firstSixDigits = Number(number.slice(0, 6));

        switch (normalizedBrand) {
            case "visa":
                return number.startsWith("4");
            case "mastercard":
                return (
                    (firstTwoDigits >= 51 && firstTwoDigits <= 55) ||
                    (firstSixDigits >= 222100 && firstSixDigits <= 272099)
                );
            case "american":
                return number.startsWith("34") || number.startsWith("37");
            case "discover":
                return (
                    number.startsWith("6011") ||
                    number.startsWith("65") ||
                    (firstThreeDigits >= 644 && firstThreeDigits <= 649)
                );
            default:
                return false;
        }
    }
}
