const { Sequelize, DataTypes } = require('sequelize');
const db = require('../model'); // Sequelize instance

// Function to dynamically create a table based on frontend data
const createTable = async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    const { tableName, fields } = req.body;

    // Validate input
    if (!tableName || !Array.isArray(fields) || fields.length === 0) {
      return res.status(400).json({ error: "Invalid table structure" });
    }

    // Dynamically define the model
    const tableDefinition = {};

    fields.forEach((field, index) => {
      console.log(`Processing field ${index}:`, field); // Log each field for debugging

      const fieldName = field.fieldName; // Access fieldName
      const fieldType = field.fieldType ? field.fieldType.toUpperCase() : null; // Access fieldType

      if (!fieldName || !fieldType) {
        console.error(`Invalid field definition at index ${index}`, field);
        return res.status(400).json({ error: `Invalid field definition at index ${index}` });
      }

      // Ensure DataTypes maps correctly
      const sequelizeType = DataTypes[fieldType] || DataTypes.STRING; // Default to STRING if unknown type

      tableDefinition[fieldName] = {
        type: sequelizeType,
        allowNull: field.allowNull !== undefined ? field.allowNull : true,
        unique: field.unique || false
      };
    });
  console.log(`Table definition:`, tableDefinition); // Log the final table definition for debugging
    // Check if table definition is empty
    if (Object.keys(tableDefinition).length === 0) {
      return res.status(400).json({ error: "No valid fields to create table" });
    }

    // Define the model dynamically based on the received tableName and fields
    const Model = db.sequelize.define(tableName, tableDefinition);

    // Sync the model to create the table
    await Model.sync({ force: false });  // { force: false } prevents overwriting the table if it already exists

    // Return success response
    return res.status(200).json({ message: `Table ${tableName} created successfully!` });
  } catch (error) {
    console.error('Error creating table:', error);
    return res.status(500).json({ error: 'Failed to create table' });
  }
};

const getAllTables = async (req, res) => {
    try {
      // Use Sequelize's queryInterface to show all tables
      const tables = await db.sequelize.getQueryInterface().showAllTables();
  
      if (tables.length === 0) {
        return res.status(404).json({ message: 'No tables found in the database.' });
      }
  
      return res.status(200).json({ tables });
    } catch (error) {
      console.error('Error retrieving tables:', error);
      return res.status(500).json({ error: 'Failed to retrieve tables' });
    }
  };
  

module.exports = { createTable, getAllTables };
