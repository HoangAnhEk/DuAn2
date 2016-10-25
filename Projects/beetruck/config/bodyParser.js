'use strict'

module.exports = {

	limit: '1mb',

	strict: true,

	qs: {
	
		depth: 5,

		parameterLimit: 1000,

		delimiter: '&',

		allowDots: false
	},
	uploads: {

		multiple: true,

		hash: false,

		maxSize: '2mb'
		
	}
}
