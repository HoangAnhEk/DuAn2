'use strict'

const Order = use('App/Model/Order')
const Category = use('App/Model/Category')
const Weight = use('App/Model/Weight')

class OrderController {

	constructor() {
		this.order = new Order
	}

    /**
     * hiển thị danh sách vận đơn và thông tin
	 * trọng tải, tài xế, nhân viên
     * 
     * @param	{Object} request
     * @param	{Object} response
     */
	* index(request, response) {
		const orders = yield Order.query()
			.with(['weight', 'driver', 'manager'])
			.orderBy('updated_at', 'desc')
			.fetch()
		yield response.sendView('order.index', {
			orders: orders.toJSON()
		})
	}

    /**
     * hiển thị trang thêm
	 * vận đơn
     * 
     * @param	{Object} request
     * @param	{Object} response
     */
	* create(request, response) {
		const categories = yield Category.all()
		const weights = yield Weight.all()
		yield response.sendView('order.create', {
			categories: categories.toJSON(),
			weights: weights.toJSON()
		})
	}

    /**
     * xử lý thông tin vận đơn từ trang
	 * thêm vận đơn
     * 
     * @param	{Object} request
     * @param	{Object} response
     */
	* store(request, response) {
		this.order.fill(request.all())
		const validation = yield this.order.isValid()
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

    /**
     * xem chi tiết vận đơn dựa vào
	 * id
     * 
     * @param	{Object} request
     * @param	{Object} response
     */
	* show(request, response) {
		this.order = yield Order.query()
			.where('id', request.param('id'))
			.with(['category', 'weight', 'driver', 'manager'])
			.first()
		yield response.sendView('order.show', {
			order: this.order.toJSON()
		})
	}

    /**
     * hiển thị trang sửa thông tin
	 * vận đơn
     * 
     * @param	{Object} request
     * @param	{Object} response
     */
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

    /**
     * xử lý thông tin cập nhật của
	 * vận đơn
     * 
     * @param	{Object} request
     * @param	{Object} response
     */
	* update(request, response) {
		this.order = yield Order.find(request.param('id'))
		this.order.fill(request.all())
		const validation = yield this.order.isValid()
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

    /**
     * xóa vận đơn dựa vào
	 * id
     * 
     * @param	{Object} request
     * @param	{Object} response
     */
	* destroy(request, response) {
		this.order = yield Order.find(request.param('id'))
		yield this.order.delete()
		response.redirect('/orders')
	}

}

module.exports = OrderController
