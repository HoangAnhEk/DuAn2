'use strict'

const Lucid = use('Lucid')
const Validator = use('Validator')
const _ = use('lodash')

class Price extends Lucid {

    get rules() {
        return {
            weight_id: 'required|integer'
        }
    }

    get messages() {
        return {}
    }

    fill(inputs) {
        if (inputs.weight_id) {
            this.weight_id = parseInt(inputs.weight_id)
        }
        const levels = {}
        _.forEach(inputs.level_ids, (id, index) => {
            let key = parseInt(id)
            let price = parseInt((inputs.level_values)[index]) || 0
            levels[key] = { price: price }
        })
        return levels
    }

    valid() {
        return Validator.validateAll(this.attributes, this.rules, this.messages)
    }

    // relationships
    weight() {
        return this.belongsTo('App/Model/Weight')
    }
    levels() {
        return this.belongsToMany('App/Model/Level', 'price_level').withPivot('price')
    }

}

module.exports = Price
