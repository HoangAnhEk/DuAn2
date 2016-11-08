'use strict'

const Report = use('App/Model/Report')
const Driver = use('App/Model/Driver')

class ReportController {

	constructor() {
		this.report = new Report
	}

    /**
     * hiển thị danh sách báo cáo và thông tin
	 * tài xế, nhân viên
     * 
     * @param	{Object} request
     * @param	{Object} response
     */
	* index(request, response) {
		const reports = yield Report.query().with(['driver', 'manager']).fetch()
		yield response.sendView('report.index', {
			reports: reports.toJSON()
		})
	}

    /**
     * hiển thị trang tạo
	 * báo cáo
     * 
     * @param	{Object} request
     * @param	{Object} response
     */
	* create(request, response) {
		yield response.sendView('report.create')
	}

	/**
	 * xử lý dữ liệu khi thêm
	 * báo cáo
	 * 
	 * @param	{Object} request
	 * @param	{Object} response
	 */
	* store(request, response) {
		this.report.fill(request.all())
		const validation = yield this.report.isValid()
		if (validation.fails()) {
			yield request
				.withAll()
				.andWith({ errors: validation.messages() })
				.flash()
			return response.redirect('back')
		}
		this.report.manager_id = request.currentUser.id;
		yield this.report.save()
		response.redirect('/reports')
	}

	/**
	 * trang xem chi tiết của
	 * báo cáo
	 * 
	 * @param	{Object} request
	 * @param	{Object} response
	 */
	* show(request, response) {
		this.report = yield Report.query()
			.where('id', request.param('id'))
			.with(['driver', 'manager'])
			.first()
		yield response.sendView('report.show', {
			report: this.report.toJSON()
		})
	}

	/**
	 * hiển thị trang sửa
	 * báo cáo
	 * 
	 * @param	{Object} request
	 * @param	{Object} response
	 */
	* edit(request, response) {
		this.report = yield Report.query()
			.where('id', request.param('id'))
			.with(['driver', 'manager'])
			.first()
		yield response.sendView('report.edit', {
			report: this.report.toJSON()
		})
	}

	/**
	 * xử lý thông tin cập nhật của
	 * báo cáo
	 * 
	 * @param	{Object} request
	 * @param	{Object} response
	 */
	* update(request, response) {
		this.report = yield Report.find(request.param('id'))
		this.report.fill(request.all())
		const validation = yield this.report.isValid()
		if (validation.fails()) {
			yield request
				.withAll()
				.andWith({ errors: validation.messages() })
				.flash()
			return response.redirect('back')
		}
		yield this.report.save()
		yield request.with({ success: true }).flash()
		response.redirect('back')
	}

	/**
	 * xóa báo cáo dựa vào
	 * id
	 * 
	 * @param	{Object} request
	 * @param	{Object} response
	 */
	* destroy(request, response) {
		this.report = yield Report.find(request.param('id'))
		yield this.report.delete()
		response.redirect('/reports')
	}

}

module.exports = ReportController
