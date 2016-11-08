'use strict'

const Toanid = use('Toanid')
const Validator = use('Validator')
const _ = use('lodash')

class Driver extends Toanid {

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

    get messages() {
        return {}
    }

    get fillable() {
        return [
            'first_name',
            'last_name',
            'birthday',
            'address',
            'identification',
            'weight_id:integer',
            'driving_license',
            'license_plate',
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

    weight() {
        return this.belongsTo('App/Model/Weight')
    }

}

module.exports = Driver
