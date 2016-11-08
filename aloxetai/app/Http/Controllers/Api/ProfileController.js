'use strict'

const Driver = use('App/Model/Driver')
const Hash = use('Hash')

class ProfileController {

    constructor() {
        this.driver = new Driver
    }

    /**
     * hiển thị thông tin cá nhân
     * của tài xế
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * index(request, response) {
        this.driver = yield Driver.query()
            .select([
                'last_name',
                'first_name',
                'phone',
                'birthday',
                'address',
                'identification',
                'driving_license',
                'license_plate'
            ])
            .where('id', request.authUser.id)
            .first()
        response.json(this.driver.toJSON())
    }

    /**
     * thay đổi mật khẩu
     * của tài xế
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * changePassword(request, response) {
        this.driver = yield Driver.find(request.authUser.id)
        const isVerify = yield Hash.verify(request.input('old_password'), this.driver.password)
        if (!isVerify) {
            response.status(403)
            return
        }
        // save
        this.driver.newpassword = request.input('password')
        yield this.driver.save()
        response.ok()
    }

}

module.exports = ProfileController
