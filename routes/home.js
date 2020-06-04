'use strict'

const express = require('express')
const homeRouter = express.Router()

const Controller = require('../controllers/home')

homeRouter.get( '/', Controller.show)

module.exports = homeRouter;
