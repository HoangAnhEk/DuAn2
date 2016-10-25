'use strict'

const Hash = use('Hash')
const _ = use('lodash')

const Manager = exports = module.exports = {}

Manager.createPassword = function*(next) {
    
    this.password = yield Hash.make(this.password)

    yield next
}

Manager.updatePassword = function*(next) {

    if (this.newpassword) {

        this.password = this.newpassword

        delete this.attributes.newpassword

        this.password = yield Hash.make(this.password)

    }

    yield next
}
