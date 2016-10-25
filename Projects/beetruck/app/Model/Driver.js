'use strict'

const Lucid = use('Lucid')
const Validator = use('Validator')
const _ = use('lodash')

class Driver extends Lucid {

    static boot() {

        super.boot()
        this.addHook('beforeCreate', 'Driver.createPassword')
        this.addHook('beforeUpdate', 'Driver.updatePassword')

    }

    get rules() {

        return {
            last_name: 'required|min:2|max:255',
            first_name: 'required|min:2|max:255',
            birthday: 'required',
            address: 'required',
            identification: 'required',
            weight_id: 'required|integer',
            driving_license: 'required',
            license_plate: 'required',
            phone: 'required|unique:drivers,phone',
            password: 'required|min:6|max:12'
        }

    }

    set rules(rules) {

        this.rules = rules

    }

    get messages() {

        return {}

    }

    fill(inputs) {

        if (inputs.first_name) {
            this.first_name = inputs.first_name
        }

        if (inputs.last_name) {
            this.last_name = inputs.last_name
        }

        if (inputs.birthday) {
            this.birthday = inputs.birthday
        }

        if (inputs.address) {
            this.address = inputs.address
        }

        if (inputs.identification) {
            this.identification = inputs.identification
        }

        if (inputs.weight_id) {
            this.weight_id = parseInt(inputs.weight_id)
        }

        if (inputs.driving_license) {
            this.driving_license = inputs.driving_license
        }

        if (inputs.license_plate) {
            this.license_plate = inputs.license_plate
        }

        if (inputs.phone) {
            this.phone = inputs.phone
        }

        if (inputs.password) {
            this.password = inputs.password
        }

        if (inputs.newpassword) {
            this.newpassword = inputs.newpassword
        }

    }


    valid() {

        let rules = this.rules

        if (this.id) {

            rules.phone = `${rules.phone},id,${this.id}`

            if (this.newpassword) {
                rules.newpassword = _.replace(rules.password, 'required|', '')
            }

            delete rules.password

        }

        return Validator.validateAll(this.attributes, rules, this.messages)

    }

    weight() {

        return this.belongsTo('App/Model/Weight')

    }

}

module.exports = Driver
