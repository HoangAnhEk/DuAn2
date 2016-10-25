'use strict'

const Env = use('Env')
const Ouch = use('youch')
const View = use('View')

// libraries
const _ = use('lodash')
const moment = use('moment')

const Http = exports = module.exports = {}

/**
 * Bắt các sự kiện lỗi và đưa về dạng user interface.
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
	yield response.status(status).sendView('errors/index', { error })

}

/**
 * Lắng nghe cho các sự kiện ở Http.start sau khi khởi động http.
 */
Http.onStart = function () {
	// setter
	moment.locale('vi')
	// var
	View.global('TeamName', 'HoangAnhEk')
	View.global('Version', '1.0.1')
	View.global('MapApiKey', 'AIzaSyD8p0ld9nLZORW3yzScaOQEDnMhmD0WYcU')
	// helper
	View.global('_', _)
	View.global('moment', moment)
	View.global('Helpers', use('App/Helpers'))
}
