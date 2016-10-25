'use strict'

const Coin = use('App/Model/Coin')
const Driver = use('App/Model/Driver')

const Event = use('Event')

class CoinController {

	constructor() {
		this.coin = new Coin
	}

	* index(request, response) {
		const coins = yield Coin.query().with(['driver', 'manager']).fetch()
		yield response.sendView('coin.index', {
			coins: coins.toJSON()
		})
	}

	* create(request, response) {
		yield response.sendView('coin.create')
	}

	* store(request, response) {

		this.coin.fill(request.all())
		const validation = yield this.coin.valid()
		if (validation.fails()) {
			yield request
				.withAll()
				.andWith({ errors: validation.messages() })
				.flash()
			return response.redirect('back')
		}

		this.coin.manager_id = request.currentUser.id;
		yield this.coin.save()

		Event.fire('coin.added', this.coin.driver_id, this.coin.coin)

		response.redirect('/coins')

	}

	* show(request, response) {
		this.coin = yield Coin.query()
			.with(['driver', 'manager'])
			.where('id', request.param('id'))
			.first()

		yield response.sendView('coin.show', {
			coin: this.coin.toJSON()
		})
	}

	* destroy(request, response) {

		this.coin = yield Coin.find(request.param('id'))
		yield this.coin.delete()
		response.redirect('/coins')

	}

	* drivers(request, response) {
		const keyword = '%' + request.input('term') + '%' || null
		const drivers = yield Driver.query()
			.select('id', 'first_name', 'phone')
			.where('phone', 'like', keyword)
			.orWhere('first_name', 'like', keyword)
			.fetch()
		response.json(drivers.toJSON())
	}

}

module.exports = CoinController
