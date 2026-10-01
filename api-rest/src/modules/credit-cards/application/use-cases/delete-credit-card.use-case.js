const { AppError } = require('../../../../shared/errors/AppError');

class DeleteCreditCardUseCase {
  constructor(creditCardRepository) {
    this.creditCardRepository = creditCardRepository;
  }

  async execute(id) {
    const deleted = await this.creditCardRepository.delete(id);
    if (!deleted) throw new AppError('Tarjeta no encontrada', 404);
  }
}

module.exports = { DeleteCreditCardUseCase };
