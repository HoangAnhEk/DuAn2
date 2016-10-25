'use strict'

const Lucid = use('Lucid')
const Validator = use('Validator')

class Weight extends Lucid {

    get rules() {
        return {
            weight: 'required',
            description: 'max:255',
            order: 'required|integer',
        }
    }

    get messages() {
        return {}
    }

    fill(inputs) {
        if (inputs.weight) {
            this.weight = inputs.weight
        }
        if (inputs.description) {
            this.description = inputs.description
        }
        if (inputs.order) {
            this.order = parseInt(inputs.order)
        }
    }

    valid() {
        return Validator.validateAll(this.attributes, this.rules, this.messages)
    }

}

module.exports = Weight
