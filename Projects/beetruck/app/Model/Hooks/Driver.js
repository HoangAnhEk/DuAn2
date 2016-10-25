'use strict'

const Hash = use('Hash')
const _ = use('lodash')

const Driver = exports = module.exports = {}

Driver.createPassword = function* (next) {

    this.password = yield Hash.make(this.password)

    yield next
}

Driver.updatePassword = function* (next) {

    if (this.newpassword) {

        this.password = this.newpassword

        delete this.attributes.newpassword

        this.password = yield Hash.make(this.password)

    }

    yield next
}
