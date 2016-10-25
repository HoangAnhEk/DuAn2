'use strict'

const Config = use('Config')

module.exports = {

	authenticator: 'session',

	session: {
		serializer: 'Lucid',
		model: 'App/Model/Manager',
		scheme: 'session',
		uid: 'phone',
		password: 'password'
	},

	basic: {
		serializer: 'Lucid',
		model: 'App/Model/User',
		scheme: 'basic',
		uid: 'phone',
		password: 'password'
	},

	jwt: {
		serializer: 'Lucid',
		model: 'App/Model/User',
		scheme: 'jwt',
		secret: Config.get('app.appKey')
	},

	api: {
		serializer: 'Lucid',
		model: 'App/Model/Token',
		scheme: 'api'
	}

}
