'use strict'

const app = require('./app')
const fold = require('adonis-fold')
const Ace = require('adonis-ace')
const path = require('path')
const packageFile = path.join(__dirname, '../package.json')
require('./extend')

/**
 * Lệnh của ace
 */

module.exports = function () {

	fold.Registrar.register(app.providers.concat(app.aceProviders))
		.then(() => {
			fold.Ioc.aliases(app.aliases)

			const Helpers = use('Helpers')
			Helpers.load(packageFile, fold.Ioc)

			Ace.register(app.commands)
			Ace.invoke(require(packageFile))
		})
		.catch((error) => console.error(error.stack))

}
