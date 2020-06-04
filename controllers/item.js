const {Item} = require('../models')
const idrFormat = require('../helpers/idrFormat')
const {Op} = require('Sequelize')

class ItemController {
    static search(req, res) {
        let params = req.query.search
        Item.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${params}%`
                }
            }
        })
        .then(data => {
            res.render('items/list', {data, idrFormat})
        })
        .catch(err => {
            res.send(err)
        })
    }
    
    static show(req, res) {
        if (req.query.search) {
            ItemController.search(req, res)
        } else {
            Item.findAll()
            .then(data => {
                res.render('items/list', {data, idrFormat})
            })
            .catch(err => {
                res.send(err)
            })
        }
    }
    
    static add(req, res) {
        const data = null
        res.render('items/form',{data})
    }
    
    static insert(req, res) {
        const obj = {
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            type: req.body.type,
            exp_date: req.body.exp_date
        }
        Item.create(obj)
        .then(data => {
            res.redirect('/items')
        })
        .catch(err => {
            res.send(err)
        })
    }
    
    static edit(req, res) {
        let id = req.params.id
        Item.findByPk(Number(id))
        .then(data => {
            res.render('items/form', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }
    
    static post(req, res) {
        const obj = {
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            type: req.body.type,
            exp_date: req.body.exp_date
        }
        Item.update(obj,{where: {id : req.params.id}})
        .then(data => {
            res.redirect('/items')
        })
        .catch(err => {
            res.send(err)
        })
    }
    
    static delete(req, res) {
        let params = req.params.id
        Item.destroy({
            where: {
                id: Number(params)
            }
        })
        .then(data => {
            res.redirect('/items')
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = ItemController