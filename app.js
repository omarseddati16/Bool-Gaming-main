// Carica dotenv solo in locale
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const routers = require('./routes/routers');
const notFound = require('./middlewares/routesNotFound');
const error = require('./middlewares/error');

app.use(express.static('public'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server attivo!');
});

app.use('/videogames', routers);

app.use(notFound);
app.use(error);

app.listen(port, () => {
  console.log(`Server in ascolto nella porta ${port}`);
});
