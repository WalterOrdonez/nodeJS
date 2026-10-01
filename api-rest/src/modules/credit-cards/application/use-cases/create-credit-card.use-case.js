const { AppError } = require('../../../../shared/errors/AppError');
const { CreditCard } = require('../../domain/credit-card.entity');

class CreateCreditCardUseCase {
  constructor(creditCardRepository) {
    this.creditCardRepository = creditCardRepository;
  }

  execute(data) {
    if (!CreditCard.isValid(data)) {
      throw new AppError('cardHolder, number, brand y expiration son requeridos', 400);
    }
    return this.creditCardRepository.create(data);
  }
}

module.exports = { CreateCreditCardUseCase };
