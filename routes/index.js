'use strict'

const express = require('express')
const router = express.Router()

const homeRouter = require('./home')
const transactionRouter = require('./transaction')
const itemRouter = require('./item')
const userRouter = require('./user')


router.use( '/', homeRouter)
router.use( '/items', itemRouter)
router.use( '/transactions', transactionRouter)
router.use( '/users', userRouter)

module.exports = router;
