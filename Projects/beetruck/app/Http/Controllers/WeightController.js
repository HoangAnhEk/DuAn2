'use strict'

const Weight = use('App/Model/Weight')

class WeightController {

    constructor() {
        this.weight = new Weight()
    }

    * index(request, response) {
        const weights = yield Weight.all()
        yield response.sendView('weight.create', {
            weights: weights.toJSON()
        })
    }

    * store(request, response) {
        this.weight.fill(request.all())
        const validation = yield this.weight.valid()
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

    * edit(request, response) {
        const weights = yield Weight.all()
        this.weight = yield Weight.find(request.param('id'))
        yield response.sendView('weight.edit', {
            weights: weights.toJSON(),
            weight: this.weight.toJSON()
        })
    }

    * update(request, response) {
        this.weight = yield Weight.find(request.param('id'))
        this.weight.fill(request.all())
        const validation = yield this.weight.valid()
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

    * destroy(request, response) {

        this.weight = yield Weight.find(request.param('id'))
        yield this.weight.delete()
        response.redirect('/weights')
        
    }

}

module.exports = WeightController
