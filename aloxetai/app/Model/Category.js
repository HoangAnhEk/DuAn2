'use strict'

const Toanid = use('AloXeTai/Src/Toanid')

class Category extends Toanid {

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
            'name.required': 'Tên loại không được trống',
            'order.required': 'Thứ tự hiển thị không được trống',
            'order.integer': 'Thứ tự hiển thị phải là số'
        }
    }

}

module.exports = Category
