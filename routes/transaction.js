'use strict'

const express = require('express')
const transactionRouter = express.Router()
const Controller = require('../controllers/transaction')
const isLogin = require('../helpers/isLogin.js')

transactionRouter.get('/', isLogin, Controller.show)
transactionRouter.get('/add', Controller.add)
transactionRouter.post('/add', Controller.insert)
transactionRouter.get('/delete/:id', Controller.delete)
transactionRouter.get('/print/:id', Controller.print)

module.exports = transactionRouter;
