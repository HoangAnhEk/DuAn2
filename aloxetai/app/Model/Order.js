'use strict'

const Toanid = use('Toanid')
const Validator = use('Validator')

class Order extends Toanid {

    get fillable() {
        return [
            'name',
            'phone',
            'shipping_location',
            'delivery_location',
            'time',
            'total_weight',
            'weight_id:integer',
            'category_id:integer',
            'percent:integer'
        ]
    }

    get rules() {
        return {
            name: 'required|min:3',
            phone: 'required|min:6|max:15',
            shipping_location: 'required|min:2',
            delivery_location: 'required|min:2',
            category_id: 'required|integer',
            weight_id: 'required|integer',
            percent: 'required|integer'
        }
    }

    get messages() {
        return {}
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
