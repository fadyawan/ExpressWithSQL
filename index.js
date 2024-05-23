const express = require('express');
const bodyParser = require('body-parser');

const customerRoutes = require('./routes/customers');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Hotel Service API');
});

app.use('/customers', customerRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
