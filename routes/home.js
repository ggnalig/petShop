'use strict'

const express = require('express')
const homeRouter = express.Router()

const Controller = require('../controllers/home')

homeRouter.get( '/', Controller.show)
homeRouter.get('/register', Controller.registerForm);
homeRouter.post('/register', Controller.registerPost);
homeRouter.get('/login', Controller.loginForm);
homeRouter.post('/login', Controller.loginPost)
homeRouter.get('/logout', Controller.logout)

module.exports = homeRouter;
