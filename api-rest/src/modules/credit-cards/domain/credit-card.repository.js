// Puerto que debe implementar cualquier adaptador de persistencia
class CreditCardRepository {
  findAll() {
    throw new Error('Not implemented');
  }

  findById(id) {
    throw new Error('Not implemented');
  }

  create(data) {
    throw new Error('Not implemented');
  }

  update(id, data) {
    throw new Error('Not implemented');
  }

  delete(id) {
    throw new Error('Not implemented');
  }
}

module.exports = { CreditCardRepository };
