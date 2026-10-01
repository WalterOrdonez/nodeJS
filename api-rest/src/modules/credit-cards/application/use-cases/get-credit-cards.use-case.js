class GetCreditCardsUseCase {
  constructor(creditCardRepository) {
    this.creditCardRepository = creditCardRepository;
  }

  execute() {
    return this.creditCardRepository.findAll();
  }
}

module.exports = { GetCreditCardsUseCase };
