'use strict'

const Office = use('App/Model/Office')

class OfficeController {

    constructor() {
        this.office = new Office
    }

    /**
     * thiển thị danh sách chức vụ và form
     * thêm chức vụ
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * index(request, response) {
        const offices = yield Office.query()
            .orderBy('order', 'asc')
            .fetch()
        yield response.sendView('office.create', {
            offices: offices.toJSON()
        })
    }

    /**
     * xử lý thông tin khi thêm
     * chức vụ
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * store(request, response) {
        this.office.fill(request.all())
        const validation = yield this.office.isValid()
        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()
            return response.redirect('back')
        }
        yield this.office.save()
        response.redirect('back')
    }

    /**
     * hiển thị trang sửa thông tin
     * chức vụ
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * edit(request, response) {
        const offices = yield Office.query()
            .orderBy('order', 'asc')
            .fetch()
        this.office = yield Office.find(request.param('id'))
        yield response.sendView('office.edit', {
            offices: offices.toJSON(),
            office: this.office.toJSON()
        })
    }

    /**
     * xử lý thông tin khi cập nhật
     * chức vụ
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * update(request, response) {
        this.office = yield Office.find(request.param('id'))
        this.office.fill(request.all())
        const validation = yield this.office.isValid()
        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()
            return response.redirect('back')
        }
        yield this.office.save()
        yield request.with({ success: true }).flash()
        response.redirect('back')
    }

    /**
     * xóa chức vụ dựa vào
     * id
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * destroy(request, response) {
        this.office = yield Office.find(request.param('id'))
        yield this.office.delete()
        response.redirect('back')
    }

}

module.exports = OfficeController
