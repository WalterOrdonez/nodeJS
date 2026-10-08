import Joi from "joi";
import { CreditCard } from "../../../domain/credit-card.entity";

const cardHolder = Joi.string().trim().min(1);
const number = Joi.string()
    .trim()
    .pattern(/^\d{12,19}$/)
    .messages({
        "string.pattern.base": "number debe contener entre 12 y 19 dígitos",
    });
const brand = Joi.string()
    .trim()
    .lowercase()
    .valid("visa", "mastercard", "american", "discover");
const cvv = Joi.string()
    .pattern(/^\d+$/)
    .messages({ "string.pattern.base": "cvv debe contener solo dígitos" });
const expiration = Joi.string()
    .trim()
    .pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)
    .messages({ "string.pattern.base": "expiration debe tener formato MM/YY" });

const isCvvValidForBrand = (brand: string, cvv: string): boolean => {
    const expectedLength = brand === "american" ? 4 : 3;
    return cvv.length === expectedLength;
};

const cvvMessages = {
    "creditCard.cvvBrand": "El CVV no corresponde con la marca de la tarjeta",
};

export const createCreditCardSchema = Joi.object({
    cardHolder: cardHolder.required(),
    number: number.required(),
    brand: brand.required(),
    cvv: cvv.required(),
    expiration: expiration.required(),
})
    .custom((value, helpers) => {
        if (!CreditCard.isBrandNumberValid(value.brand, value.number)) {
            return helpers.error("creditCard.brandNumber");
        }
        if (!isCvvValidForBrand(value.brand, value.cvv)) {
            return helpers.error("creditCard.cvvBrand");
        }
        return value;
    })
    .messages({
        "creditCard.brandNumber":
            "El número de tarjeta no corresponde con la marca",
        ...cvvMessages,
    })
    .required();

export const updateCreditCardSchema = Joi.object({
    cardHolder,
    number,
    brand,
    cvv,
    expiration,
})
    .min(1)
    .custom((value, helpers) => {
        if (
            value.brand &&
            value.number &&
            !CreditCard.isBrandNumberValid(value.brand, value.number)
        ) {
            return helpers.error("creditCard.brandNumber");
        }
        if (value.cvv && !value.brand) {
            return helpers.error("creditCard.cvvBrand");
        }
        if (
            value.brand &&
            value.cvv &&
            !isCvvValidForBrand(value.brand, value.cvv)
        ) {
            return helpers.error("creditCard.cvvBrand");
        }
        return value;
    })
    .messages({
        "creditCard.brandNumber":
            "El número de tarjeta no corresponde con la marca",
        ...cvvMessages,
    })
    .required();

export const creditCardIdSchema = Joi.object({
    id: Joi.string()
        .guid({ version: "uuidv4" })
        .required()
        .messages({ "string.guid": "id debe ser un UUID versión 4 válido" }),
}).required();
