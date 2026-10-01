const { InMemoryCreditCardRepository } = require('./infrastructure/data/in-memory-credit-card.repository');
const { GetCreditCardsUseCase } = require('./application/use-cases/get-credit-cards.use-case');
const { GetCreditCardByIdUseCase } = require('./application/use-cases/get-credit-card-by-id.use-case');
const { CreateCreditCardUseCase } = require('./application/use-cases/create-credit-card.use-case');
const { UpdateCreditCardUseCase } = require('./application/use-cases/update-credit-card.use-case');
const { DeleteCreditCardUseCase } = require('./application/use-cases/delete-credit-card.use-case');
const { createCreditCardController } = require('./infrastructure/http/credit-card.controller');
const { createCreditCardRouter } = require('./infrastructure/http/credit-card.routes');

// Composition root del módulo: conecta dominio, aplicación e infraestructura
const creditCardRepository = new InMemoryCreditCardRepository();

const creditCardController = createCreditCardController({
  getCreditCardsUseCase: new GetCreditCardsUseCase(creditCardRepository),
  getCreditCardByIdUseCase: new GetCreditCardByIdUseCase(creditCardRepository),
  createCreditCardUseCase: new CreateCreditCardUseCase(creditCardRepository),
  updateCreditCardUseCase: new UpdateCreditCardUseCase(creditCardRepository),
  deleteCreditCardUseCase: new DeleteCreditCardUseCase(creditCardRepository),
});

const creditCardRoutes = createCreditCardRouter(creditCardController);

module.exports = { creditCardRoutes };
