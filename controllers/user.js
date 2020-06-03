const {User} = require('../models')
const passwordHider = require('../helpers/passwordHider')
const {Op} = require('Sequelize')

class userController {
    static search(req, res) {
        let params = req.query.search
        User.findAll({
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
            res.render('users/list', {data, passwordHider})
        })
        .catch(err => {
            res.send(err)
        })
    }
    
    static show(req, res) {
        if (req.query.search) {
            userController.search(req, res)
        } else {
            User.findAll()
            .then(data => {
                res.render('users/list', {data, passwordHider})
            })
            .catch(err => {
                res.send(err)
            })
        }
    }
    
    static add(req, res) {
        let alert = req.query.alert
        const data = null
        res.render('users/form',{data, alert})
    }
    
    static insert(req, res) {
        const obj = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: req.body.password
        }
        User.create(obj)
        .then(data => {
            res.redirect('/users')
        })
        .catch(err => {
            res.redirect(`/users/add?alert=${err.errors[0].message}`)
        })
    }
    
    static edit(req, res) {
        let id = req.params.id
        User.findByPk(Number(id))
        .then(data => {
            res.render('users/form', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }
    
    static post(req, res) {
        const obj = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: req.body.password
        }
        User.update(obj,{where: {id : req.params.id}})
        .then(data => {
            res.redirect('/users')
        })
        .catch(err => {
            res.redirect(`/users/add?alert=${err.errors[0].message}`)
        })
    }
    
    static delete(req, res) {
        let params = req.params.id
        User.destroy({
            where: {
                id: Number(params)
            }
        })
        .then(data => {
            res.redirect('/users')
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = userController