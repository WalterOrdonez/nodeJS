import { AppDataSource } from "../../database/data-source";
import { CreateCreditCardUseCase } from "./application/use-cases/create-credit-card.use-case";
import { DeleteCreditCardUseCase } from "./application/use-cases/delete-credit-card.use-case";
import { GetCreditCardByIdUseCase } from "./application/use-cases/get-credit-card-by-id.use-case";
import { GetCreditCardsUseCase } from "./application/use-cases/get-credit-cards.use-case";
import { UpdateCreditCardUseCase } from "./application/use-cases/update-credit-card.use-case";
import { InMemoryCreditCardRepository } from "./adapters/out/persistence/in-memory-credit-card.repository";
import { CreditCardOrmEntity } from "./adapters/out/persistence/credit-card.orm-entity";
import { TypeOrmCreditCardRepository } from "./adapters/out/persistence/typeorm-credit-card.repository";
import { createCreditCardController } from "./adapters/in/http/credit-card.controller";
import { createCreditCardRouter } from "./adapters/in/http/credit-card.routes";

export async function createCreditCardModule() {
    const adapter = process.env.CREDIT_CARD_REPOSITORY ?? "memory";
    let creditCardRepository;

    if (adapter === "memory") {
        creditCardRepository = new InMemoryCreditCardRepository();
    } else if (adapter === "postgres") {
        await AppDataSource.initialize();
        creditCardRepository = new TypeOrmCreditCardRepository(
            AppDataSource.getRepository(CreditCardOrmEntity),
        );
    } else {
        throw new Error(
            `CREDIT_CARD_REPOSITORY inválido: ${adapter}. Usa "memory" o "postgres".`,
        );
    }

    const creditCardController = createCreditCardController({
        getCreditCardsUseCase: new GetCreditCardsUseCase(creditCardRepository),
        getCreditCardByIdUseCase: new GetCreditCardByIdUseCase(
            creditCardRepository,
        ),
        createCreditCardUseCase: new CreateCreditCardUseCase(
            creditCardRepository,
        ),
        updateCreditCardUseCase: new UpdateCreditCardUseCase(
            creditCardRepository,
        ),
        deleteCreditCardUseCase: new DeleteCreditCardUseCase(
            creditCardRepository,
        ),
    });

    return createCreditCardRouter(creditCardController);
}
