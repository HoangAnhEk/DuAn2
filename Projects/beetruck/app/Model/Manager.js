'use strict'

const Lucid = use('Lucid')
const Validator = use('Validator')
const _ = use('lodash')

class Manager extends Lucid {

    static boot() {

        super.boot()
        this.addHook('beforeCreate', 'Manager.createPassword')
        this.addHook('beforeUpdate', 'Manager.updatePassword')

    }

    get rules() {

        return {
            last_name: 'required|min:2|max:255',
            first_name: 'required|min:2|max:255',
            birthday: 'required',
            gender: 'required|integer',
            address: 'required',
            identification: 'required',
            office_id: 'required|integer',
            phone: 'required|unique:managers,phone',
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

        if (inputs.gender) {
            this.gender = parseInt(inputs.gender)
        }

        if (inputs.address) {
            this.address = inputs.address
        }

        if (inputs.identification) {
            this.identification = inputs.identification
        }

        if (inputs.office_id) {
            this.office_id = parseInt(inputs.office_id)
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

    office() {

        return this.belongsTo('App/Model/Office')

    }

    permissions() {

        return this.belongsToMany('App/Model/Permission', 'permission_manager')

    }

}

module.exports = Manager
