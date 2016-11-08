'use strict'

const Toanid = use('Toanid')
const Validator = use('Validator')

class Weight extends Toanid {

    get fillable() {
        return ['weight', 'description', 'order:integer']
    }

    get rules() {
        return {
            weight: 'required',
            description: 'max:255',
            order: 'required|integer',
        }
    }

    get messages() {
        return {
            'weight.required': 'Khối lượng không được trống',
            'order.required': 'Số thứ tự không được trống',
            'order.integer': 'Số thứ tự phải là số'
        }
    }

}

module.exports = Weight
