'use strict'

const Manager = use('App/Model/Manager')
const Office = use('App/Model/Office')
const Permission = use('App/Model/Permission')

class ManagerController {

    constructor() {
        this.manager = new Manager
    }

    /**
     * hiển thị danh sách nhân viên và
     * thông tin chức vụ
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * index(request, response) {
        const managers = yield Manager.query().with('office').fetch()
        yield response.sendView('manager.index', {
            managers: managers.toJSON()
        })
    }

    /**
     * hiển thị trang thêm
     * nhân viên
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * create(request, response) {
        const offices = yield Office.all()
        yield response.sendView('manager.create', {
            offices: offices.toJSON()
        })
    }

    /**
     * xử lý thông tin cá nhân và thông tin đăng nhập
     * của nhân viên
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * store(request, response) {
        this.manager.fill(request.all())
        const validation = yield this.manager.isValid()
        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()
            return response.redirect('back')
        }
        yield this.manager.save()
        response.redirect('/managers')

    }

    /**
     * hiển thị trang sửa thông tin
     * nhân viên
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * edit(request, response) {
        const offices = yield Office.all()
        const permissions = yield Permission.all()
        this.manager = yield Manager.query().where('id', request.param('id'))
            .with('permissions')
            .first()
        yield response.sendView('manager.edit', {
            offices: offices.toJSON(),
            permissions: permissions.toJSON(),
            manager: this.manager.toJSON()
        })
    }

    /**
     * xử lý thông tin cập nhật của
     * nhân viên
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * update(request, response) {
        this.manager = yield Manager.find(request.param('id'))
        this.manager.fill(request.all())
        const validation = yield this.manager.isValid()
        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()
            return response.redirect('back')
        }
        yield this.manager.save()
        if (request.input('permissions')) {
            yield this.manager.permissions().sync(request.input('permissions'))
        } else {
            yield this.manager.permissions().detach()
        }
        yield request.with({ success: true }).flash()
        response.redirect('back')
    }

    /**
     * xóa nhân viên dựa vào
     * id
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * destroy(request, response) {
        this.manager = yield Manager.find(request.param('id'))
        yield this.manager.delete()
        response.redirect('/managers')
    }

    /**
     * thay đổi trạng thái kích hoạt của
     * nhân viên
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * state(request, response) {
        this.manager = yield Manager.find(request.param('id'))
        this.manager.active = this.manager.active ? false : true
        yield this.manager.save()
        response.redirect('back')
    }

}

module.exports = ManagerController
