'use strict'

const Toanid = use('Toanid')
const Validator = use('Validator')
const _ = use('lodash')

class Price extends Toanid {

    get fillable() {
        return ['weight_id:integer']
    }

    get rules() {
        return {
            weight_id: 'required|integer'
        }
    }

    get messages() {
        return {
            'weight_id.required': 'Chưa chọn loại trọng tải'
        }
    }

    fill(inputs) {
        super.fill(inputs)

        const levels = {}
        _.forEach(inputs.level_ids, (id, index) => {
            let key = parseInt(id)
            let price = parseInt((inputs.level_values)[index]) || 0
            levels[key] = { price: price }
        })
        return levels
    }

    weight() {
        return this.belongsTo('App/Model/Weight')
    }

    levels() {
        return this.belongsToMany('App/Model/Level', 'price_level').withPivot('price')
    }

}

module.exports = Price
