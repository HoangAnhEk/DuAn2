'use strict'

/*
 |--------------------------------------------------------------------------
 | Cài đặt máy chủ HTTP
 |--------------------------------------------------------------------------
 |
 | Ở đây sẽ được thêm các phần khác của máy chủ HTTP.
 |
 */

const app = require('./app')
const fold = require('adonis-fold')
const path = require('path')
const packageFile = path.join(__dirname, '../package.json')
require('./extend')

module.exports = function (callback) {
	fold.Registrar
		.register(app.providers)
		.then(() => {
			/*
			 |--------------------------------------------------------------------------
			 | Đăng ký Aliases
			 |--------------------------------------------------------------------------
			 |
			 */
			fold.Ioc.aliases(app.aliases)

			/*
			 |--------------------------------------------------------------------------
			 | Đăng ký các package
			 |--------------------------------------------------------------------------
			 |
			 */
			const Helpers = use('Helpers')
			const Env = use('Env')
			Helpers.load(packageFile, fold.Ioc)

			/*
			 |--------------------------------------------------------------------------
			 | Đăng ký các sự kiện
			 |--------------------------------------------------------------------------
			 |
			 */
			require('./events')

			/*
			 |--------------------------------------------------------------------------
			 | Tải lên Middleware và Routes
			 |--------------------------------------------------------------------------
			 |
			 */
			use(Helpers.makeNameSpace('Http', 'kernel'))
			use(Helpers.makeNameSpace('Http', 'routes'))

			/*
			 |--------------------------------------------------------------------------
			 | Khởi động máy chủ Http
			 |--------------------------------------------------------------------------
			 |
			 */
			const Server = use('Adonis/Src/Server')
			const Socket = use('App/Http/Socket')
			Socket(Server.getInstance())
			Server.listen(Env.get('HOST'), Env.get('PORT'))
			if (typeof (callback) === 'function') {
				callback()
			}
		})
		.catch((error) => console.error(error.stack))
}
