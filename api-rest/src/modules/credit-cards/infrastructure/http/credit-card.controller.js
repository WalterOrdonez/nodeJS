const createCreditCardController = ({
  getCreditCardsUseCase,
  getCreditCardByIdUseCase,
  createCreditCardUseCase,
  updateCreditCardUseCase,
  deleteCreditCardUseCase,
}) => ({
  getAll: async (req, res, next) => {
    try {
      const cards = await getCreditCardsUseCase.execute();
      res.json(cards);
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const card = await getCreditCardByIdUseCase.execute(Number(req.params.id));
      res.json(card);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const card = await createCreditCardUseCase.execute(req.body);
      res.status(201).json(card);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const card = await updateCreditCardUseCase.execute(Number(req.params.id), req.body);
      res.json(card);
    } catch (err) {
      next(err);
    }
  },

  remove: async (req, res, next) => {
    try {
      await deleteCreditCardUseCase.execute(Number(req.params.id));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
});

module.exports = { createCreditCardController };
