const {Transcaction, User, Item} = require('../models')
const {Op} = require('Sequelize')
const idrFormat = require('../helpers/idrFormat')

class transactionController {
    static search(req, res) {
        let params = req.query.search
        Transcaction.findAll({
            include: [User],
            where: {
                [Op.or]: [{
                    first_name: {
                        [Op.iLike]: `%${params}%`
                    }
                }, {
                    last_name: {
                        [Op.iLike]: `%${params}%`
                    }
                }]
            }
        })
        .then(data => {
            res.render('transactions/list', {data, idrFormat})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static show(req, res) { 
        Transcaction.findAll( {
            include:[User, Item]
        })
        .then(data => {
            res.render('transactions/list', {data, idrFormat})
        })
        .catch(err => {
            res.send(err)
        })
    }
    
    static add(req, res) {
        let data = null 
        let user = null
        let item = null
        let alert = req.query.alert
        User.findAll()
        .then(users => {
            user = users
            return Item.findAll()
        })
        .then(items => {
            item = items
            res.render('transactions/form', {data, user, item, alert, idrFormat})
        })
        .catch(err => res.send(err))
    }
    
    static insert(req, res) {
        let x = req.body.price
        let y = req.body.quantity
        const obj = {
            UserId: req.body.UserId,
            ItemId: req.body.ItemId,
            quantity: req.body.quantity,
            price: req.body.price,
            total: x * y
        }
        Transcaction.create(obj)
        .then(data => {
            res.redirect('/transactions')
        })
        .catch(err => {
            res.send(err)
        })
    }
    
    static delete(req, res) {
        let id = req.params.id
        Transcaction.destroy({
            where: {
                id: Number(id)
            }
        })
        .then(data => {
            res.redirect('/transactions')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static print(req, res) {
        let id = req.params.id
        let alert = req.query.alert
        Transcaction.findByPk(Number(id))
        .then(data => {
            res.render('invoices/invoice', {data, alert, idrFormat})
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = transactionController