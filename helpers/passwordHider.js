'use strict'

function passwordHider(password) {
    let res = ''
    for (let i = 0; i < password.length; i++) {
        res += '*'
    }
    return res
}

module.exports = passwordHider