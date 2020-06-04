'use strict'

const express = require('express')
const itemRouter = express.Router()
const Controller = require('../controllers/item')
const isLogin = require('../helpers/isLogin.js')

itemRouter.get('/', Controller.show)
itemRouter.get('/add', isLogin, Controller.add)
itemRouter.post('/add', Controller.insert)
itemRouter.get('/edit/:id', Controller.edit)
itemRouter.post('/edit/:id', Controller.post)
itemRouter.get('/delete/:id', Controller.delete)

module.exports = itemRouter;
