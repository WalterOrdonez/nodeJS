class CreditCard {
  constructor({ id, cardHolder, number, brand, expiration }) {
    this.id = id;
    this.cardHolder = cardHolder;
    this.number = number;
    this.brand = brand;
    this.expiration = expiration;
  }

  static isValid({ cardHolder, number, brand, expiration }) {
    return Boolean(cardHolder && number && brand && expiration);
  }
}

module.exports = { CreditCard };
