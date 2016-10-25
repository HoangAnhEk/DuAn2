'use strict'

const Lucid = use('Lucid')
const Validator = use('Validator')

class Coin extends Lucid {

    get rules() {
        return {
            coin: 'required|integer',
            description: 'max:255',
            driver_id: 'required|integer',
        }
    }

    get messages() {
        return {
            "coin.required": "Chưa nhập số xu cần nạp"
        }
    }

    fill(inputs) {
        if (inputs.coin) {
            this.coin = parseInt(inputs.coin)
        }
        if (inputs.description) {
            this.description = inputs.description
        }
        if (inputs.driver_id) {
            this.driver_id = parseInt(inputs.driver_id)
        }
    }

    valid() {
        return Validator.validateAll(this.attributes, this.rules, this.messages)
    }

    driver() {
        return this.belongsTo('App/Model/Driver')
    }

    manager() {
        return this.belongsTo('App/Model/Manager')
    }

}

module.exports = Coin
