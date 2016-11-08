'use strict'

class LoginController {

    /**
     * hiển thị trang đăng nhập
     * tài khoản
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * index(request, response) {
        yield response.sendView('auth.login')
    }

    /**
     * xử lý thông tin đăng nhập và tạo phiên
     * cho nhân viên
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
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
                case 'PasswordMisMatchException': {
                    errors.push({
                        field: 'password',
                        message: 'Mật khẩu không chính xác'
                    })
                } break;
                case 'UserNotFoundException': {
                    errors.push({
                        field: 'phone',
                        message: 'Số điện thoại không chính xác'
                    })
                } break;
            }
            yield request.withOnly('phone', 'remember')
                .andWith({ errors: errors })
                .flash()
            response.redirect('back')
        }
    }

    /**
     * đăng xuất tài khoản và di chuyển về trang
     * đăng nhập
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * logout(request, response) {
        yield request.auth.logout()
        response.redirect('/login')
    }

}

module.exports = LoginController
