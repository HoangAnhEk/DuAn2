'use strict'

const Env = use('Env')
const Ouch = use('youch')
const AloXeTai = use('AloXeTai')

const Http = exports = module.exports = {}

/**
 * lắng nghe các lỗi đến từ http request.
 *
 * @param  {Object} error
 * @param  {Object} request
 * @param  {Object} response
 */
Http.handleError = function* (error, request, response) {
	/**
	 * DEVELOPMENT
	 */
	if (Env.get('NODE_ENV') === 'development') {
		const ouch = new Ouch().pushHandler(
			new Ouch.handlers.PrettyPageHandler('blue', null, 'sublime')
		)
		ouch.handleException(error, request.request, response.response, (output) => {
			console.error(error.stack)
		})
		return
	}

	/**
	 * PRODUCTION
	 */
	const status = error.status || 500
	console.error(error.stack)
	yield response.status(status).send(error.message)
}

/**
 * lắng nghe các sự kiện http.start được phát ra sau khi
 * khởi động máy chủ http.
 */
Http.onStart = function () {
	const View = use('View')
	use('moment').locale('vi')

	// Thông tin
	View.global('Version', AloXeTai.appVersion)
	View.global('TeamName', AloXeTai.teamName)
	View.global('MapApiKey', AloXeTai.googleMapKey)

	// Cho phép views sử dụng
	View.global('moment', use('moment'))
	View.global('_', use('lodash'))
	View.global('helper', use('AloXeTai/Src/Helper'))
}
