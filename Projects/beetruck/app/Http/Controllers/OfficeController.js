'use strict'

const Office = use('App/Model/Office')

class OfficeController {

    constructor() {
        this.office = new Office();
    }

    * index(request, response) {
        const offices = yield Office.all()
        yield response.sendView('office.create', {
            offices: offices.toJSON()
        })
    }

    * store(request, response) {
        this.office.fill(request.all())
        const validation = yield this.office.valid()
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

    * edit(request, response) {
        const offices = yield Office.all()
        this.office = yield Office.find(request.param('id'))
        yield response.sendView('office.edit', {
            offices: offices.toJSON(),
            office: this.office.toJSON()
        })
    }

    * update(request, response) {
        this.office = yield Office.find(request.param('id'))
        this.office.fill(request.all())
        const validation = yield this.office.valid()
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

    * destroy(request, response) {
        this.office = yield Office.find(request.param('id'))
        yield this.office.delete()
        response.redirect('back')
    }

}

module.exports = OfficeController
