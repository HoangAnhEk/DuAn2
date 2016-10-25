'use strict'

class LoginController {

    * index(request, response) {
        yield response.sendView('auth.login')
    }

    * login(request, response) {

        try {

            const phone = request.input('phone')
            const password = request.input('password')
            const login = yield request.auth.attempt(phone, password)

            if (login) {
                response.redirect('/')
            }

        } catch (error) {

            let errors = []

            switch (error.name) {
                case 'PasswordMisMatchException':
                    {
                        errors.push({
                            field: 'password',
                            message: 'Mật khẩu không chính xác'
                        })
                    }
                    break;
                case 'UserNotFoundException':
                    {
                        errors.push({
                            field: 'phone',
                            message: 'Số điện thoại không chính xác'
                        })
                    }
                    break;
            }

            yield request.withOnly('phone', 'remember')
                .andWith({ errors: errors })
                .flash()
            response.redirect('back')

        }

    }

    * logout(request, response) {

        yield request.auth.logout()
        response.redirect('/auth/login')

    }

}

module.exports = LoginController
