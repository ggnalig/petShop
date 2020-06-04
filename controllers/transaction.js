const {Transcaction, User, Item} = require('../models')
class transactionController {
    static show(req, res) { 
        Transcaction.findAll( {
            include:[User, Item]
        })
        .then(data => {
            res.render('transactions/list', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }
    
    static add(req, res) {
        let data = null 
        let user = null
        let item = null
        User.findAll()
        .then(users => {
            user = users
            return Item.findAll()
        })
        .then(items => {
            item = items
            res.render('transactions/form', {data, user, item})
        })
        .catch(err => res.send(err))
    }
    
    static insert(req, res) {
        const obj = {
            UserId: req.body.UserId,
            ItemId: req.body.ItemId,
            quantity: req.body.quantity,
            total: req.body.total
        }
        Transcaction.create(obj)
        .then(data => {
            res.redirect('/transactions')
        })
        .catch(err => {
            res.send(err)
        })
    }
    
    static edit(req, res) {
        
    }
    
    static post(req, res) {
        
    }
    
    static delete(req, res) {
        
    }
}

module.exports = transactionController