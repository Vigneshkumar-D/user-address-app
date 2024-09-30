const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./src/config/db');
const cors = require('cors');
const User = require('./src/models/User');
const Address = require('./src/models/Address');

const app = express();
app.use(cors());
app.use(bodyParser.json());

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log('Error: ' + err));

sequelize.sync({ alter: true })
  .then(() => console.log('Models synchronized...'))
  .catch((err) => console.log('Error: ' + err));

app.post('/api/register', async (req, res) => {
  const { name, address, city, state, zipCode, country } = req.body;

  try {
  
    const user = await User.create({ name });

    console.log("user");
    
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

app.get('/api/user-list', async (req, res) => {
  try {
    const addresses = await Address.findAll({
      include: [{
        model: User,
        attributes: ['id', 'name'], 
      }],
    });

    const formattedAddresses = addresses.map(address => ({
      userId: address.User.id, // Assuming the User model has an 'id' field
      address: address.address,
      city: address.city,
      state: address.state,
      country: address.country,
      zipCode: address.zipCode,
      name: address.User.name, // Assuming the User model has a 'name' field
    }));

    res.status(200).json(formattedAddresses); // Send formatted addresses as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching addresses' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
