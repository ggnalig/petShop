const { User } = require('../models');
const { compare } = require('../helpers/bcrypt.js');

class Home {
    static show(req, res) {
        res.render('home')
    }

    static registerForm(req, res) {
        const { error } = req.session
        delete req.session.error
        res.render('register', { error })
    }

    static registerPost(req, res) {
        const { first_name, last_name, username, password } = req.body
        const newUser = { first_name, last_name, username, password }

        User.create(newUser)
            .then(() => res.redirect('/'))
            .catch(err => {
                req.session.error = err.message
                res.redirect("/register")
            })
    }

    static loginForm(req, res) {
        const { error } = req.session
        delete req.session.error
        res.render('login', {error})
    }

    static loginPost(req, res) {
        const { username, password } = req.body
        User.findOne({
            where: { username }
        })
        .then(result => {
            if (result) {
                if (compare(password, result.password)) {
                    req.session.isLogin = true;
                    res.redirect("/items")
                } else {
                    req.session.error = "Username/Password doesn't match"
                    res.redirect("/login")
                }
            } 
            else {
                req.session.error = "Username/Password doesn't match"
                res.redirect("/login")
            }
        })
        .catch(err => {
            req.session.error = err.message
            res.redirect("/login")
        })
    }

    static logout(req, res) {
        delete req.session.isLogin
        res.redirect('/')
    }
}

module.exports = Home