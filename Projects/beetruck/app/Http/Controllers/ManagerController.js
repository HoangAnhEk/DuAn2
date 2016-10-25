'use strict'

const Manager = use('App/Model/Manager')
const Office = use('App/Model/Office')
const Permission = use('App/Model/Permission')

class ManagerController {

    constructor() {
        this.manager = new Manager
    }

    * index(request, response) {

        const managers = yield Manager.query().with('office').fetch()
        yield response.sendView('manager.index', {
            managers: managers.toJSON()
        })

    }

    * create(request, response) {

        const offices = yield Office.all()
        yield response.sendView('manager.create', {
            offices: offices.toJSON()
        })

    }

    * store(request, response) {

        this.manager.fill(request.all())
        const validation = yield this.manager.valid()
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

    * update(request, response) {

        this.manager = yield Manager.find(request.param('id'))
        this.manager.fill(request.all())

        const validation = yield this.manager.valid()
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
        }

        response.redirect('back')

    }

    * destroy(request, response) {

        this.manager = yield Manager.find(request.param('id'))
        yield this.manager.delete()
        response.redirect('/managers')

    }

    * state(request, response) {

        this.manager = yield Manager.find(request.param('id'))
        this.manager.active = (this.manager.active ? false : true)

        yield this.manager.save()
        response.redirect('back')

    }

}

module.exports = ManagerController
