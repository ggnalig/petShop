'use strict'

const express = require('express')
const transactionRouter = express.Router()

const Controller = require('../controllers/transaction')

transactionRouter.get('/', Controller.show)
transactionRouter.get('/add', Controller.add)
transactionRouter.post('/add', Controller.insert)
transactionRouter.get('/edit/:id', Controller.edit)
transactionRouter.post('/edit/:id', Controller.post)
transactionRouter.post('/delete/:id', Controller.delete)

module.exports = transactionRouter;
