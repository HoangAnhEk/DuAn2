'use strict'

const Env = use('Env')

module.exports = {

	appKey: Env.get('APP_KEY'),

	encryption: {
		algorithm: 'aes-256-cbc'
	},

	http: {

		allowMethodSpoofing: true,

		trustProxy: false,

		subdomainOffset: 2,

		setPoweredBy: true,

		jsonpCallback: 'callback'

	},

	views: {

		cache: Env.get('CACHE_VIEWS', true),

		injectServices: true

	},

	static: {
	
		dotfiles: 'ignore',

		etag: true,

		extensions: false
		
	}
}
