'use strict'

const express = require('express')
const userRouter = express.Router()
const Controller = require('../controllers/user')
const isLogin = require('../helpers/isLogin.js')

userRouter.get('/', isLogin, Controller.show)
userRouter.get('/add', Controller.add)
userRouter.post('/add', Controller.insert)
userRouter.get('/edit/:id', Controller.edit)
userRouter.post('/edit/:id', Controller.post)
userRouter.get('/delete/:id', Controller.delete)

module.exports = userRouter;
