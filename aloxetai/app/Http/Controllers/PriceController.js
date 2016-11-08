'use strict'

const Price = use('App/Model/Price')
const Weight = use('App/Model/Weight')
const Level = use('App/Model/Level')

class PriceController {

    constructor() {
        this.price = new Price
    }

    /**
     * hiển thị trang bảng giá và form thêm loại
     * giá
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * index(request, response) {
        const levels = yield Level.all()
        const weights = yield Weight.all()
        const prices = yield Price.query().with(['weight', 'levels']).fetch()
        yield response.sendView('price.create', {
            levels: levels.toJSON(),
            weights: weights.toJSON(),
            prices: prices.toJSON()
        })
    }

    /**
     * xử lý thông tin khi thêm loại
     * giá
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * store(request, response) {
        const levels = this.price.fill(request.all())
        const validation = yield this.price.isValid()
        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()
            return response.redirect('back')
        }
        yield this.price.save()
        yield this.price.levels().sync(levels)

        return response.redirect('back')
    }

    /**
     * hiển thị bảng giá và form sửa
     * thông tin loại giá
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * edit(request, response) {
        const prices = yield Price.query().with(['weight', 'levels']).fetch()
        const price = yield Price.query().where('id', request.param('id')).with('levels').first()
        const levels = yield Level.all()
        const weights = yield Weight.all()
        yield response.sendView('price.edit', {
            prices: prices.toJSON(),
            price: price.toJSON(),
            levels: levels.toJSON(),
            weights: weights.toJSON()
        })
    }

    /**
     * xử lý thông tin cập nhật
     * loại giá
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * update(request, response) {
        this.price = yield Price.find(request.param('id'))
        const levels = this.price.fill(request.all())
        const validation = yield this.price.isValid()
        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()
            return response.redirect('back')
        }
        yield this.price.save()
        yield this.price.levels().sync(levels)
        yield request.with({ success: true }).flash()
        response.redirect('back')
    }

    /**
     * xóa loại giá dựa vào
     * id
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * destroy(request, response) {
        this.price = yield Price.find(request.param('id'))
        yield this.price.delete()
        response.redirect('back')
    }

}

module.exports = PriceController
