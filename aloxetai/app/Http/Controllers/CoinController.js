'use strict'

const Coin = use('App/Model/Coin')
const Driver = use('App/Model/Driver')
const Event = use('Event')

class CoinController {

	constructor() {
		this.coin = new Coin
	}

    /**
     * hiển thị danh sách lịch sử
	 * nạp xu
     * 
     * @param	{Object} request
     * @param	{Object} response
     */
	* index(request, response) {
		const coins = yield Coin.query()
			.with(['driver', 'manager'])
			.fetch()
		yield response.sendView('coin.index', {
			coins: coins.toJSON()
		})
	}

    /**
     * trang nạp xu chưa form nhập thông
	 * tin xu và tài xế cần nạp
     * 
     * @param	{Object} request
     * @param	{Object} response
     */
	* create(request, response) {
		yield response.sendView('coin.create')
	}

    /**
     * xử lý thông tin nạp xu
	 * từ form
     * 
     * @param	{Object} request
     * @param	{Object} response
     */
	* store(request, response) {
		this.coin.fill(request.all())
		const validation = yield this.coin.isValid()
		if (validation.fails()) {
			yield request
				.withAll()
				.andWith({ errors: validation.messages() })
				.flash()
			return response.redirect('back')
		}
		this.coin.manager_id = request.currentUser.id
		yield this.coin.save()
		Event.fire('coin.add', this.coin)
		response.redirect('/coins')
	}

    /**
     * xem chi tiết lịch xử
	 * nạp
     * 
     * @param	{Object} request
     * @param	{Object} response
     */
	* show(request, response) {
		this.coin = yield Coin.query()
			.with(['driver', 'manager'])
			.where('id', request.param('id'))
			.first()
		yield response.sendView('coin.show', {
			coin: this.coin.toJSON()
		})
	}

    /**
     * xóa lịch sử nạp xu dựa vào
	 * id
     * 
     * @param	Object} request
     * @param	{Object} response
     */
	* destroy(request, response) {
		this.coin = yield Coin.find(request.param('id'))
		yield this.coin.delete()
		response.redirect('/coins')
	}

}

module.exports = CoinController
