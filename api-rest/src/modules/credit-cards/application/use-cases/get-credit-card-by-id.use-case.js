const { AppError } = require('../../../../shared/errors/AppError');

class GetCreditCardByIdUseCase {
  constructor(creditCardRepository) {
    this.creditCardRepository = creditCardRepository;
  }

  async execute(id) {
    const card = await this.creditCardRepository.findById(id);
    if (!card) throw new AppError('Tarjeta no encontrada', 404);
    return card;
  }
}

module.exports = { GetCreditCardByIdUseCase };
