'use strict'

const Lucid = use('Lucid')
const Validator = use('Validator')

class Report extends Lucid {

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
        return {}
    }

    fill(inputs) {
        if (inputs.title) {
            this.title = inputs.title
        }
        if (inputs.content) {
            this.content = inputs.content
        }
        if (inputs.driver_id) {
            this.driver_id = parseInt(inputs.driver_id)
        }
        if (inputs.customer_name) {
            this.customer_name = inputs.customer_name
        }
        if (inputs.customer_phone) {
            this.customer_phone = inputs.customer_phone
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

module.exports = Report
