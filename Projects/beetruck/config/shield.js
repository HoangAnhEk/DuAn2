'use strict'

module.exports = {

	csp: {
		directives: {},
		reportOnly: false,
		setAllHeaders: false,
		disableAndroid: true
	},

	xss: {
		enabled: true,
		enableOnOldIE: false
	},

	xframe: 'DENY',
	nosniff: false,
	noopen: true,

	csrf: {
		enable: true,
		methods: ['POST', 'PUT', 'DELETE'],
		filterUris: [],
		compareHostAndOrigin: true
	}

}
