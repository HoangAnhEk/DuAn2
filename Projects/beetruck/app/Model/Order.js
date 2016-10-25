'use strict'

const Lucid = use('Lucid')
const Validator = use('Validator')

class Order extends Lucid {

    get rules() {
        return {
            name: 'required|min:3',
            phone: 'required|min:6|max:15',
            shipping_location: 'required|min:2',
            delivery_location: 'required|min:2',
            // time: 'required',
            // total_weight: 'required',
            category_id: 'required|integer',
            weight_id: 'required|integer',
            percent: 'required|integer'
        }
    }

    get messages() {
        return {}
    }

    fill(inputs) {
        if (inputs.name) {
            this.name = inputs.name
        }
        if (inputs.phone) {
            this.phone = inputs.phone
        }
        if (inputs.shipping_location) {
            this.shipping_location = inputs.shipping_location
        }
        if (inputs.delivery_location) {
            this.delivery_location = inputs.delivery_location
        }
        if (inputs.time) {
            this.time = inputs.time
        }
        if (inputs.total_weight) {
            this.total_weight = inputs.total_weight
        }
        if (inputs.weight_id) {
            this.weight_id = parseInt(inputs.weight_id)
        }
        if (inputs.category_id) {
            this.category_id = parseInt(inputs.category_id)
        }
        if (inputs.percent) {
            this.percent = parseInt(inputs.percent)
        }
    }

    valid() {
        return Validator.validateAll(this.attributes, this.rules, this.messages)
    }

    category() {
        return this.belongsTo('App/Model/Category')
    }

    weight() {
        return this.belongsTo('App/Model/Weight')
    }

    driver() {
        return this.belongsTo('App/Model/Driver')
    }

    manager() {
        return this.belongsTo('App/Model/Manager')
    }

}

module.exports = Order
