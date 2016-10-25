'use strict'

class HomeController {
    * index(request, response) {

        yield response.sendView('home')

    }
}

module.exports = HomeController
