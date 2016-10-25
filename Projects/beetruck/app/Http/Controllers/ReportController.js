'use strict'

const Report = use('App/Model/Report')
const Driver = use('App/Model/Driver')

const _ = use('lodash')

class ReportController {

	constructor() {
		this.report = new Report
	}

	* index(request, response) {
		const reports = yield Report.query().with(['driver', 'manager']).fetch()
		yield response.sendView('report.index', {
			reports: reports.toJSON()
		})
	}

	* create(request, response) {
		yield response.sendView('report.create')
	}

	* store(request, response) {
		this.report.fill(request.all())
		const validation = yield this.report.valid()
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

	* show(request, response) {
		this.report = yield Report.query().where('id', request.param('id')).with(['driver', 'manager']).first()
		yield response.sendView('report.show', {
			report: this.report.toJSON()
		})
	}

	* edit(request, response) {
		this.report = yield Report.query()
			.where('id', request.param('id'))
			.with('driver')
			.first()
		yield response.sendView('report.edit', {
			report: this.report.toJSON()
		})
	}

	* update(request, response) {
		this.report = yield Report.find(request.param('id'))
		this.report.fill(request.all())
		const validation = yield this.report.valid()
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

	* destroy(request, response) {

		this.report = yield Report.find(request.param('id'))
		yield this.report.delete()
		response.redirect('/reports')

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

module.exports = ReportController
