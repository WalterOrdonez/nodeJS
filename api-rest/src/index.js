const { port } = require('./config/env');
const app = require('./app');

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
