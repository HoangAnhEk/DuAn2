'use strict'

const Weight = use('App/Model/Weight')
const Driver = use('App/Model/Driver')

class DriverController {

	constructor() {
		this.driver = new Driver
	}

    /**
     * hiển thị danh sách tất cả
	 * tài xế
     * 
     * @param	{Object} request
     * @param	{Object} response
     */
	* index(request, response) {
		const drivers = yield Driver.query()
			.with('weight')
			.fetch()
		yield response.sendView('driver.index', {
			drivers: drivers.toJSON()
		})
	}

	/**
	 * trang thêm tài xế chưa form nhập thông tin cá nhân và 
	 * thông tin đăng nhập của tài xế
	 * 
	 * @param	{Object} request
	 * @param	{Object} response
	 */
	* create(request, response) {
		const weights = yield Weight.all()
		yield response.sendView('driver.create', {
			weights: weights.toJSON()
		})
	}

	/**
	 * xử lý thông tin tài xế từ trang
	 * thêm tài xế
	 * 
	 * @param	{Object} request
	 * @param	{Object} response
	 */
	* store(request, response) {
		this.driver.fill(request.all())
		const validation = yield this.driver.isValid()
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

	/**
	 * trang hiển thị form sửa thông tin cả nhân và
	 * thông tin đăng nhập của tài xế
	 * 
	 * @param	{Object} request
	 * @param	{Object} response
	 */
	* edit(request, response) {
		const weights = yield Weight.all()
		this.driver = yield Driver.find(request.param('id'))
		yield response.sendView('driver.edit', {
			weights: weights.toJSON(),
			driver: this.driver.toJSON()
		})
	}

	/**
	 * xử lý cập nhật thông tin của tài xế
	 * từ trang sửa
	 * 
	 * @param	{Object} request
	 * @param	{Object} response
	 */
	* update(request, response) {
		this.driver = yield Driver.find(request.param('id'))
		this.driver.fill(request.all())

		const validation = yield this.driver.isValid()
		if (validation.fails()) {
			yield request
				.withAll()
				.andWith({ errors: validation.messages() })
				.flash()
			return response.redirect('back')
		}
		yield request.with({ success: true }).flash()
		yield this.driver.save()
		response.redirect('back')
	}

	/**
	 * xóa tài xế dựa vào
	 * id
	 * 
	 * @param	{Object} request
	 * @param	{Object} response
	 */
	* destroy(request, response) {
		this.driver = yield Driver.find(request.param('id'))
		yield this.driver.delete()
		response.redirect('/drivers')
	}

	/**
	 * thay đổi trạng thái kích hoạt
	 * của tài xế
	 * 
	 * @param	{Object} request
	 * @param	{Object} response
	 */
	* state(request, response) {
		this.driver = yield Driver.find(request.param('id'))
		this.driver.active = (this.driver.active ? false : true)
		yield this.driver.save()
		response.redirect('back')
	}

	/**
	 * hiển thị trang nạp xu dựa vào
	 * id tài xế
	 * 
	 * @param	{Object} request
	 * @param	{Object} response
	 */
	* coin(request, response) {
		this.driver = yield Driver.find(request.param('id'))
		yield response.sendView('coin.create', {
			driver: this.driver.toJSON()
		})
	}

}

module.exports = DriverController
