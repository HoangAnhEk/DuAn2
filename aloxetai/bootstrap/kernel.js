'use strict'

/*
 |--------------------------------------------------------------------------
 | Cài đặt Ace
 |--------------------------------------------------------------------------
 |
 */

const app = require('./app')
const fold = require('adonis-fold')
const Ace = require('adonis-ace')
const path = require('path')
const packageFile = path.join(__dirname, '../package.json')
require('./extend')

module.exports = function () {
	fold.Registrar
		.register(app.providers.concat(app.aceProviders))
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
			 | Đăng ký các packages
			 |--------------------------------------------------------------------------
			 |
			 */
			const Helpers = use('Helpers')
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
			 | Đăng ký/Chạy lên
			 |--------------------------------------------------------------------------
			 |
			 */
			Ace.register(app.commands)
			Ace.invoke(require(packageFile))
		})
		.catch((error) => console.error(error.stack))
}
