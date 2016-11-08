'use strict'

const Driver = use('App/Model/Driver')

class LoginController {

    /**
     * xử lý thông tin đăng nhập
     * từ thiết bị
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * login(request, response) {
        const phone = request.input('phone')
        const password = request.input('password')
        try {
            const authenticator = request.auth.authenticator('jwt')
            const apiToken = yield authenticator.attempt(phone, password)
            if (apiToken) {
                response.ok({ token: apiToken })
            }
        } catch (e) {
            response.unauthorized()
        }
    }

    /**
     * đăng xuất tài xế và xóa mã token
     * khỏi phiên đăng nhập
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * logout(request, response) {
        // ...
    }

}

module.exports = LoginController
