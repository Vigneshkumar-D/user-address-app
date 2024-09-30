const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./src/config/db');
const User = require('./src/models/User');
const Address = require('./src/models/Address');

const app = express();
app.use(bodyParser.json());

// Test DB connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log('Error: ' + err));

// Sync models with DB
sequelize.sync({ alter: true })
  .then(() => console.log('Models synchronized...'))
  .catch((err) => console.log('Error: ' + err));

// POST /register - Create a user with an address
app.post('/register', async (req, res) => {
  const { name, address, city, state, zipCode, country } = req.body;

  try {
    // Create the user
    const user = await User.create({ name });

    // Create the address associated with the user
    await Address.create({
      address,
      city,
      state,
      zipCode,
      country,
      userId: user.id,
    });

    res.status(201).json({ message: 'User and address created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the user or address.' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
