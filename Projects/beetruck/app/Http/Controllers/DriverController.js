'use strict'

const Weight = use('App/Model/Weight')
const Driver = use('App/Model/Driver')

class DriverController {

	constructor() {
		this.driver = new Driver
	}

	* index(request, response) {
		const drivers = yield Driver.query().with('weight').fetch()
		yield response.sendView('driver.index', {
			drivers: drivers.toJSON()
		})
	}

	* create(request, response) {

		const weights = yield Weight.all()

		yield response.sendView('driver.create', {
			weights: weights.toJSON()
		})

	}

	* store(request, response) {

		this.driver.fill(request.all())
		const validation = yield this.driver.valid()

		if (validation.fails()) {
			yield request
				.withAll()
				.andWith({ errors: validation.messages() })
				.flash()
			return response.redirect('back')
		}

		yield this.driver.save()
		response.redirect('/drivers')

	}

	* edit(request, response) {

		const weights = yield Weight.all()
		this.driver = yield Driver.find(request.param('id'))

		yield response.sendView('driver.edit', {
			weights: weights.toJSON(),
			driver: this.driver.toJSON()
		})

	}

	* update(request, response) {

		this.driver = yield Driver.find(request.param('id'))
		this.driver.fill(request.all())

		const validation = yield this.driver.valid()
		if (validation.fails()) {
			yield request
				.withAll()
				.andWith({ errors: validation.messages() })
				.flash()
			return response.redirect('back')
		}

		yield this.driver.save()
		response.redirect('back')

	}

	* destroy(request, response) {

		this.driver = yield Driver.find(request.param('id'))
		yield this.driver.delete()
		response.redirect('/drivers')

	}

	* state(request, response) {

		this.driver = yield Driver.find(request.param('id'))
		this.driver.active = (this.driver.active ? false : true)

		yield this.driver.save()
		response.redirect('back')

	}

	* coin(request, response) {

		this.driver = yield Driver.find(request.param('id'))
		yield response.sendView('coin.create', {
			driver: this.driver.toJSON()
		})

	}

}

module.exports = DriverController
