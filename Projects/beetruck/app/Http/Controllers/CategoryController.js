'use strict'

const Category = use('App/Model/Category')

class CategoryController {

    constructor() {
        this.category = new Category()
    }

    * index(request, response) {

        const categories = yield Category.all()
        yield response.sendView('category.create', {
            categories: categories.toJSON()
        })

    }

    * store(request, response) {

        this.category.fill(request.all())
        const validation = yield this.category.valid()
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

    * edit(request, response) {

        const categories = yield Category.all()
        this.category = yield Category.find(request.param('id'))
        yield response.sendView('category.edit', {
            categories: categories.toJSON(),
            category: this.category.toJSON()
        })

    }

    * update(request, response) {

        this.category = yield Category.find(request.param('id'))
        this.category.fill(request.all())

        const validation = yield this.category.valid()
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

    * destroy(request, response) {

        this.category = yield Category.find(request.param('id'))
        yield this.category.delete()
        response.redirect('/categories')
        
    }

}

module.exports = CategoryController
