'use strict'

const Toanid = use('Toanid')
const Validator = use('Validator')

class Coin extends Toanid {

    get fillable() {
        return ['coin:integer', 'description', 'driver_id:integer']
    }

    get rules() {
        return {
            coin: 'required|integer',
            description: 'max:255',
            driver_id: 'required|integer',
        }
    }

    get messages() {
        return {
            "coin.required": "Chưa nhập số xu cần nạp",
            "driver_id.required": "Chưa chọn tài xế"
        }
    }

    driver() {
        return this.belongsTo('App/Model/Driver')
    }

    manager() {
        return this.belongsTo('App/Model/Manager')
    }

}

module.exports = Coin
