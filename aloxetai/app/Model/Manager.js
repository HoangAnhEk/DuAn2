'use strict'

const Toanid = use('Toanid')
const Validator = use('Validator')
const _ = use('lodash')

class Manager extends Toanid {

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

    get fillable() {
        return [
            'first_name',
            'last_name',
            'birthday',
            'gender:integer',
            'address',
            'identification',
            'office_id:integer',
            'phone',
            'password',
            'newpassword'
        ]
    }

    isValid() {
        if (this.id) {
            let newRules = this.rules
            newRules.phone = `${newRules.phone},id,${this.id}`
            if (this.newpassword) {
                newRules.newpassword = _.replace(newRules.password, 'required|', '')
            }
            delete newRules.password
            return super.isValid(newRules)
        }
        return super.isValid()
    }

    office() {
        return this.belongsTo('App/Model/Office')
    }

    permissions() {
        return this.belongsToMany('App/Model/Permission', 'permission_manager')
    }

}

module.exports = Manager
