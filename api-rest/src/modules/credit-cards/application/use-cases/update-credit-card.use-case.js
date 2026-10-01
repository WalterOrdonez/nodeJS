const { AppError } = require('../../../../shared/errors/AppError');

class UpdateCreditCardUseCase {
  constructor(creditCardRepository) {
    this.creditCardRepository = creditCardRepository;
  }

  async execute(id, data) {
    const card = await this.creditCardRepository.update(id, data);
    if (!card) throw new AppError('Tarjeta no encontrada', 404);
    return card;
  }
}

module.exports = { UpdateCreditCardUseCase };
