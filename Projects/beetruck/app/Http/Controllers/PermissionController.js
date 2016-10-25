'use strict'

const Permission = use('App/Model/Permission')

class PermissionController {

	* index(request, response) {
		const permissions = yield Permission.all()
		yield response.sendView('permission.index', {
			permissions: permissions.toJSON()
		})
	}

}

module.exports = PermissionController
