const {Transcaction, User, Item} = require('../models')
const idrFormat = require('../helpers/idrFormat')
class transactionController {
    static search(req, res) {
        let params = req.query.search
        Transcaction.findAll({
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
            res.render('transactions/list', {data})
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
        const obj = {
            UserId: req.body.UserId,
            ItemId: req.body.ItemId,
            quantity: req.body.quantity,
            price: 'CEK DISINIII',
            total: 'CEK DISINIII'
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
        let params = req.params.id
        Transcaction.destroy({
            where: {
                id: Number(params)
            }
        })
        .then(data => {
            res.redirect('/transactions')
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = transactionController