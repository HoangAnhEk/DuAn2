'use strict'

/*
 |--------------------------------------------------------------------------
 | Xác định tài khoản nhân viên
 |--------------------------------------------------------------------------
 |
 | Sau khi xác định sẽ truyền vào View thông tin chức vụ và các quyền
 | mà nhân viên được đảm nhận.
 |
 */

const View = use('View')
const Permission = use('App/Model/Permission')

class SessionAuth {

	* handle(request, response, next) {
		if (!request.currentUser) {
			return response.redirect('/login')
		}

		const manager = yield request.auth.getUser()
		const office = yield manager.office().first()
		const permissions = manager.administrator ? (yield Permission.all()) : (yield manager.permissions().fetch())

		View.global('currentUserOffice', office.toJSON())
		View.global('currentUserPermissions', permissions.toJSON())

		yield next
	}

}

module.exports = SessionAuth
