import { Router } from "express";
import type { CreditCardController } from "./credit-card.controller";
import {
    createCreditCardSchema,
    creditCardIdSchema,
    updateCreditCardSchema,
} from "./credit-card.schemas";
import { validateRequest } from "./validate-request";

export const createCreditCardRouter = (
    creditCardController: CreditCardController,
): Router => {
    const router = Router();

    router.get("/", creditCardController.getAll);
    router.get(
        "/:id",
        validateRequest(creditCardIdSchema, "params"),
        creditCardController.getById,
    );
    router.post(
        "/",
        validateRequest(createCreditCardSchema),
        creditCardController.create,
    );
    router.patch(
        "/:id",
        validateRequest(creditCardIdSchema, "params"),
        validateRequest(updateCreditCardSchema),
        creditCardController.update,
    );
    router.delete(
        "/:id",
        validateRequest(creditCardIdSchema, "params"),
        creditCardController.remove,
    );

    return router;
};
