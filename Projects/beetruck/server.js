'use strict'

const http = require('./bootstrap/http')
http(function () {
	const Event = use('Event')
	Event.fire('Http.start')
})
