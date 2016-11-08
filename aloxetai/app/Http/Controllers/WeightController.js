'use strict'

const Weight = use('App/Model/Weight')

class WeightController {

    constructor() {
        this.weight = new Weight
    }

    /**
     * hiển thị trang danh sách và form thêm
     * loại trọng tải xe
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * index(request, response) {
        const weights = yield Weight.query()
            .orderBy('order', 'asc')
            .fetch()
        yield response.sendView('weight.create', {
            weights: weights.toJSON()
        })
    }

    /**
     * xử lý thông tin từ form thêm trọng
     * tải xe
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * store(request, response) {
        this.weight.fill(request.all())
        const validation = yield this.weight.isValid()
        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()
            return response.redirect('back')
        }
        yield this.weight.save()
        response.redirect('/weights')
    }

    /**
     * hiển thị trang sửa thông tin loại
     * trọng tải
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * edit(request, response) {
        const weights = yield Weight.all()
        this.weight = yield Weight.find(request.param('id'))
        yield response.sendView('weight.edit', {
            weights: weights.toJSON(),
            weight: this.weight.toJSON()
        })
    }

    /**
     * xử lý dữ liệu khi cập nhật thông tin
     * loại trọng tải
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * update(request, response) {
        this.weight = yield Weight.find(request.param('id'))
        this.weight.fill(request.all())
        const validation = yield this.weight.isValid()
        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()
            return response.redirect('back')
        }
        yield this.weight.save()
        yield request.with({ success: true }).flash()
        response.redirect('back')
    }

    /**
     * xóa loại trọng tải dựa vào
     * id
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * destroy(request, response) {
        this.weight = yield Weight.find(request.param('id'))
        yield this.weight.delete()
        response.redirect('/weights')
    }

}

module.exports = WeightController
