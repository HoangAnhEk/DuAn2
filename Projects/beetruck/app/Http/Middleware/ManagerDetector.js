'use strict'

class ManagerDetector {

    * handle(request, response, next) {

        const user = yield request.auth.getUser()

        if (!user) {

            return response.redirect('/auth/login')

        } else if (user && user.active == false) {

            let errors = {
                field: 'phone',
                message: 'Tài khoản chưa được kích hoạt'
            }
            yield request.with({ errors: [errors] }).flash()
            return response.redirect('/auth/login')

        }

        yield next

    }

}

module.exports = ManagerDetector
