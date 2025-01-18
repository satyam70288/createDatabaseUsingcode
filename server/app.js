require('dotenv').config();  // Load environment variables

const express = require('express');
const { Sequelize } = require('sequelize');
const db = require('./model'); // Assuming models are initialized here
const cors = require('cors');
// Initialize Express
const app = express();
app.use(express.json());  // To parse JSON request bodies
app.use(cors());  // This allows all origins (you can restrict it later if needed)

// Define a simple test route to check if the server is working
app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.use('/table', require('./routes/tableRoute'));

db.sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
    return db.sequelize.sync({ force: false });
  })
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database or sync models:', error);
    process.exit(1);
  });
