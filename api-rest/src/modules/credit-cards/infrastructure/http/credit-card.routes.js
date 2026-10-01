const { Router } = require('express');

const createCreditCardRouter = (creditCardController) => {
  const router = Router();

  router.get('/', creditCardController.getAll);
  router.get('/:id', creditCardController.getById);
  router.post('/', creditCardController.create);
  router.patch('/:id', creditCardController.update);
  router.delete('/:id', creditCardController.remove);

  return router;
};

module.exports = { createCreditCardRouter };
