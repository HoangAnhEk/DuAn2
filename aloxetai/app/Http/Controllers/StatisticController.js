'use strict'

class StatisticController {

    * driver(request, response) {
        yield response.sendView('statistic.driver')
    }

    * coin(request, response) {
        yield response.sendView('statistic.coin')
    }

    * order(request, response) {
        yield response.sendView('statistic.order')
    }

}

module.exports = StatisticController
