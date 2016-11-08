'use strict'

const Toanid = use('Toanid')
const Validator = use('Validator')

class Office extends Toanid {

    get fillable() {
        return ['name', 'description', 'order:integer']
    }

    get rules() {
        return {
            name: 'required',
            description: 'max:255',
            order: 'required|integer',
        }
    }

    get messages() {
        return {
            'name.required': 'Tên chức vụ không được trống',
            'order.required': 'Chưa nhập thứ tự hiển thị',
            'order.integer': 'Thứ tự hiển thị phải là số'
        }
    }

}

module.exports = Office
