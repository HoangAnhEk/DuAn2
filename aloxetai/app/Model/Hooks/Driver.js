'use strict'

const Hash = use('Hash')
const _ = use('lodash')
const Driver = exports = module.exports = {}

/**
 * Tạo mật khẩu dưới dạng mã hóa
 * 
 * @param {Object} next
 */
Driver.createPassword = function* (next) {
    this.password = yield Hash.make(this.password)
    yield next
}

/**
 * Cập nhật mật khẩu mới
 * 
 * @param {Object} next
 */
Driver.updatePassword = function* (next) {
    if (this.newpassword) {
        this.password = this.newpassword
        this.password = yield Hash.make(this.password)
        _.unset(this.attributes, 'newpassword')
        console.log(this.attributes)
    }
    yield next
}
