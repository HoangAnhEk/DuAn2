'use strict'

const Order = use('App/Model/Order')
const Category = use('App/Model/Category')
const Weight = use('App/Model/Weight')
const Price = use('App/Model/Price')
const _ = use('lodash')

class OrderController {

	constructor() {
		this.order = new Order
	}

	* index(request, response) {
		const orders = yield Order.query()
			.with('weight')
			.orderBy('updated_at', 'desc')
			.fetch()
		yield response.sendView('order.index', {
			orders: orders.toJSON()
		})
	}

	* create(request, response) {
		const categories = yield Category.all()
		const weights = yield Weight.all()
		yield response.sendView('order.create', {
			categories: categories.toJSON(),
			weights: weights.toJSON()
		})
	}

	* store(request, response) {
		this.order.fill(request.all())
		const validation = yield this.order.valid()
		if (validation.fails()) {
			yield request
				.withAll()
				.andWith({ errors: validation.messages() })
				.flash()
			return response.redirect('back')
		}

		this.order.manager_id = request.currentUser.id;
		yield this.order.save()
		response.redirect('/orders')
	}

	* show(request, response) {
		this.order = yield Order.query()
			.where('id', request.param('id'))
			.with(['category', 'weight', 'driver', 'manager'])
			.first()
		yield response.sendView('order.show', {
			order: this.order.toJSON()
		})
	}

	* edit(request, response) {
		const categories = yield Category.all()
		const weights = yield Weight.all()
		const order = yield Order.find(request.param('id'))
		yield response.sendView('order.edit', {
			categories: categories.toJSON(),
			weights: weights.toJSON(),
			order: order.toJSON()
		})
	}

	* update(request, response) {
		this.order = yield Order.find(request.param('id'))
		this.order.fill(request.all())
		const validation = yield this.order.valid()
		if (validation.fails()) {
			yield request
				.withAll()
				.andWith({ errors: validation.messages() })
				.flash()
			return response.redirect('back')
		}

		yield this.order.save()
		yield request.with({ success: true }).flash()

		response.redirect('back')
	}

	* destroy(request, response) {

		this.order = yield Order.find(request.param('id'))
		yield this.order.delete()
		response.redirect('/orders')

	}

	* calc(request, response) {
		const distance = parseInt(request.input('distance'))
		const weight_id = parseInt(request.input('weight_id'))
		const percent = parseInt(request.input('percent'))

		const prices = yield Price.query().with('levels').fetch()
		const price = _.find(prices.toJSON(), ['weight_id', weight_id])
		try {
			const result = {}
			_.forEach(price.levels, function (obj) {
				var args = _.map(obj.distance.split('to'), function (val) {
					return parseInt(val)
				});
				if (distance > args[0] && distance < args[1]) {
					result['price'] = obj._pivot_price
					result['coin'] = Math.floor((obj._pivot_price * percent) / 100000) || 0
				}
			});
			response.json(result)
		} catch (e) {
			response.json({ error: true })
		}
	}

}

module.exports = OrderController
