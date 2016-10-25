'use strict'

const Env = use('Env')
const Helpers = use('Helpers')

module.exports = {

	connection: Env.get('DB_CONNECTION', 'mysql'),

	mysql: {
		client: 'mysql',
		connection: {
			host: Env.get('DB_HOST', 'localhost'),
			user: Env.get('DB_USER', 'root'),
			password: Env.get('DB_PASSWORD', ''),
			database: Env.get('DB_DATABASE', 'adonis')
		}
	}

	// ...

}
