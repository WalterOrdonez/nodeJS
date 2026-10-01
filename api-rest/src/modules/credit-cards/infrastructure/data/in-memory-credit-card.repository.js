const { CreditCardRepository } = require('../../domain/credit-card.repository');
const { CreditCard } = require('../../domain/credit-card.entity');

class InMemoryCreditCardRepository extends CreditCardRepository {
  constructor() {
    super();
    this.creditCards = [
      new CreditCard({ id: 1, cardHolder: 'Juan Perez', number: '4111111111111111', brand: 'Visa', expiration: '12/27' }),
      new CreditCard({ id: 2, cardHolder: 'Maria Lopez', number: '5500000000000004', brand: 'Mastercard', expiration: '08/26' }),
    ];
  }

  async findAll() {
    return this.creditCards;
  }

  async findById(id) {
    return this.creditCards.find((card) => card.id === id) || null;
  }

  async create(data) {
    const newCard = new CreditCard({ id: this.creditCards.length + 1, ...data });
    this.creditCards.push(newCard);
    return newCard;
  }

  async update(id, data) {
    const card = await this.findById(id);
    if (!card) return null;
    Object.assign(card, data);
    return card;
  }

  async delete(id) {
    const index = this.creditCards.findIndex((card) => card.id === id);
    if (index === -1) return false;
    this.creditCards.splice(index, 1);
    return true;
  }
}

module.exports = { InMemoryCreditCardRepository };
