module.exports =  (req, res, next) => {
    if (req.session.isLogin) {
        next()
    } else {
        req.session.error = 'You must login !'
        res.redirect('/login')
    }
}