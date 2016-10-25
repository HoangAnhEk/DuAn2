'use strict'

const Price = use('App/Model/Price')
const Weight = use('App/Model/Weight')
const Level = use('App/Model/Level')

class PriceController {

    constructor() {
        this.price = new Price()
    }

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

    * store(request, response) {
        const levels = this.price.fill(request.all())
        const validation = yield this.price.valid()
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

    * update(request, response) {
        this.price = yield Price.find(request.param('id'))
        const levels = this.price.fill(request.all())
        const validation = yield this.price.valid()
        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()
            return response.redirect('back')
        }
        // sync
        yield this.price.save()
        yield this.price.levels().sync(levels)

        yield request.with({ success: true }).flash()
        response.redirect('back')
    }

    * destroy(request, response) {
        this.price = yield Price.find(request.param('id'))
        yield this.price.delete()
        response.redirect('back')
    }

}

module.exports = PriceController
