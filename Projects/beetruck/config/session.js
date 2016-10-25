'use strict'

const Env = use('Env')

module.exports = {

	driver: Env.get('SESSION_DRIVER', 'cookie'),

	cookie: 'adonis-session',

	age: 120,

	clearWithBrowser: false,

	domain: null,

	path: '/',

	secure: false,

	file: {
		directory: 'sessions'
	}

}
