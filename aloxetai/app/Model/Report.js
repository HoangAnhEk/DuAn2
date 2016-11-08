'use strict'

const Toanid = use('Toanid')
const Validator = use('Validator')

class Report extends Toanid {

    get fillable() {
        return ['title', 'content', 'driver_id:integer', 'customer_name', 'customer_phone']
    }

    get rules() {
        return {
            title: 'required',
            content: 'required|max:255',
            driver_id: 'required|integer',
            customer_name: 'required',
            customer_phone: 'required'
        }
    }

    get messages() {
        return {
            'required': 'Bắt buộc nhập',
            'driver_id.required': 'Chưa chọn tài xế'
        }
    }

    driver() {
        return this.belongsTo('App/Model/Driver')
    }

    manager() {
        return this.belongsTo('App/Model/Manager')
    }

}

module.exports = Report
