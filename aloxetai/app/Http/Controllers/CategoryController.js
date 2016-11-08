'use strict'

const Category = use('App/Model/Category')

class CategoryController {

    constructor() {
        this.category = new Category
    }

    /**
     * trang danh sách loại hàng hóa chứa
     * form tạo loại hàng hóa
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * index(request, response) {
        const categories = yield Category.query()
            .orderBy('order', 'asc')
            .fetch()
        yield response.sendView('category.create', {
            categories: categories.toJSON()
        })
    }

    /**
     * xử lý thông tin trong quá trình 
     * thêm loại hàng hóa
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * store(request, response) {
        this.category.fill(request.all())
        const validation = yield this.category.isValid()
        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()
            return response.redirect('back')
        }
        yield this.category.save()
        response.redirect('/categories')
    }

    /**
     * trang danh sách hàng hóa chứa 
     * form sửa loại hàng hóa
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * edit(request, response) {
        const categories = yield Category.all()
        this.category = yield Category.find(request.param('id'))
        yield response.sendView('category.edit', {
            categories: categories.toJSON(),
            category: this.category.toJSON()
        })
    }

    /**
     * xử lý dữ liệu khi sửa loại
     * hàng hóa
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * update(request, response) {
        this.category = yield Category.find(request.param('id'))
        this.category.fill(request.all())
        const validation = yield this.category.isValid()
        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()
            return response.redirect('back')
        }
        yield this.category.save()
        yield request.with({ success: true }).flash()
        response.redirect('back')
    }

    /**
     * xóa loại hàng hóa dựa
     * vào id
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * destroy(request, response) {
        this.category = yield Category.find(request.param('id'))
        yield this.category.delete()
        response.redirect('/categories')
    }

}

module.exports = CategoryController
