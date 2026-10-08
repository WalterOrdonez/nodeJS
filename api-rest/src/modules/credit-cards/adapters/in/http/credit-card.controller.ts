import type { RequestHandler } from "express";
import type { CreateCreditCardUseCase } from "../../../application/use-cases/create-credit-card.use-case";
import type { DeleteCreditCardUseCase } from "../../../application/use-cases/delete-credit-card.use-case";
import type { GetCreditCardByIdUseCase } from "../../../application/use-cases/get-credit-card-by-id.use-case";
import type { GetCreditCardsUseCase } from "../../../application/use-cases/get-credit-cards.use-case";
import type { UpdateCreditCardUseCase } from "../../../application/use-cases/update-credit-card.use-case";

interface CreditCardControllerDependencies {
    getCreditCardsUseCase: GetCreditCardsUseCase;
    getCreditCardByIdUseCase: GetCreditCardByIdUseCase;
    createCreditCardUseCase: CreateCreditCardUseCase;
    updateCreditCardUseCase: UpdateCreditCardUseCase;
    deleteCreditCardUseCase: DeleteCreditCardUseCase;
}

export interface CreditCardController {
    getAll: RequestHandler;
    getById: RequestHandler;
    create: RequestHandler;
    update: RequestHandler;
    remove: RequestHandler;
}

export const createCreditCardController = ({
    getCreditCardsUseCase,
    getCreditCardByIdUseCase,
    createCreditCardUseCase,
    updateCreditCardUseCase,
    deleteCreditCardUseCase,
}: CreditCardControllerDependencies): CreditCardController => ({
    getAll: async (_req, res, next) => {
        try {
            res.json(await getCreditCardsUseCase.execute());
        } catch (error) {
            next(error);
        }
    },

    getById: async (req, res, next) => {
        try {
            res.json(await getCreditCardByIdUseCase.execute(req.params.id));
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            res.status(201).json(
                await createCreditCardUseCase.execute(req.body),
            );
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            res.json(
                await updateCreditCardUseCase.execute(req.params.id, req.body),
            );
        } catch (error) {
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            await deleteCreditCardUseCase.execute(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    },
});
