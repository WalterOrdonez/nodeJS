const express = require('express');
const cors = require('cors');

const { creditCardRoutes } = require('./modules/credit-cards');
const { notFound } = require('./shared/middlewares/notFound');
const { errorHandler } = require('./shared/middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API REST funcionando' });
});

app.use('/api/v1/credit-cards', creditCardRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
