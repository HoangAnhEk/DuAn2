'use strict'

/*
 |--------------------------------------------------------------------------
 | Kiểm tra mã xác thự từ client thiết bị
 |--------------------------------------------------------------------------
 |
 | Sau khi xác định sẽ cho truy cập vào Controller mà phía
 | route yêu cầu.
 |
 */

const View = use('View')
const Permission = use('App/Model/Permission')

class JwtAuth {

    * handle(request, response, next) {
        const authenticator = request.auth.authenticator('jwt')
        const isLoggedIn = yield authenticator.check()
        if (!isLoggedIn) {
            response.unauthorized()
            return
        }
        request.authUser = authenticator.user
        yield next
    }

}

module.exports = JwtAuth
