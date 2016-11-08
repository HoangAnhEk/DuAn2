'use strict'

const Permission = use('App/Model/Permission')

class PermissionController {

	/**
	 * hiển thị toàn bộ quyền
	 * truy cập
	 * 
	 * @param	{Object} request
     * @param	{Object} response
	 */
	* index(request, response) {
		const permissions = yield Permission.all()
		yield response.sendView('permission.index', {
			permissions: permissions.toJSON()
		})
	}

}

module.exports = PermissionController
