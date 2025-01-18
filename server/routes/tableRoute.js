const tableRouter = require('express').Router();
const { createTable, getAllTables } = require('../controller/tableCreate.controller');

// Correct method: post (not POST)
tableRouter.post('/create', createTable);
tableRouter.get('/get', getAllTables);

module.exports = tableRouter;
