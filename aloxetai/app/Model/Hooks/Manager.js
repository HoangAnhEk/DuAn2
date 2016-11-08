'use strict'

const Hash = use('Hash')
const Manager = exports = module.exports = {}

/**
 * Tạo mật khẩu dưới dạng mã hóa
 * 
 * @param {Object} next
 */
Manager.createPassword = function* (next) {
    this.password = yield Hash.make(this.password)
    yield next
}

/**
 * Cập nhật mật khẩu mới
 * 
 * @param {Object} next
 */
Manager.updatePassword = function* (next) {
    if (this.newpassword) {
        this.password = this.newpassword
        delete this.attributes.newpassword
        this.password = yield Hash.make(this.password)
    }
    yield next
}
