'use strict'

const Driver = use('App/Model/Driver')
const Manager = use('App/Model/Manager')
const Report = use('App/Model/Report')
const Order = use('App/Model/Order')
const Helper = use('AloXeTai/Src/Helper')

class HomeController {

    /**
     * hiển thị bảng điều khiển bao gồm các chức năng
     * thống kê nhanh
     * 
     * @param   {Object} request
     * @param   {Object} response
     */
    * index(request, response) {

        // 10 tài xế mới
        const drivers = yield Driver.query()
            .orderBy('created_at', 'desc')
            .limit(8)
            .fetch()

        // 10 vận đơn mới
        const orders = yield Order.query()
            .with('weight')
            .orderBy('created_at', 'desc')
            .limit(10)
            .fetch()

        // thống kê nhanh vận đơn, nhân viên, tài xế, báo cáo
        let statistics = {}

        let _total = 0
        let _complete = 0
        let _active = 0
        let _percent = 0

        // ...
        _total = yield Order.query().count("* as total").first()
        _complete = yield Order.query().where('status', '2').count("* as total").first()
        _percent = Helper.number2percent(_total.total, _complete.total)
        statistics['orders'] = {
            total: _total.total,
            complete: _complete.total,
            percent: _percent
        }
        // ...
        _total = yield Driver.query().count("* as total").first()
        _active = yield Driver.query().where('active', '1').count("* as total").first()
        _percent = Helper.number2percent(_total.total, _active.total)
        statistics['drivers'] = {
            total: _total.total,
            active: _active.total,
            percent: _percent
        }
        // ...
        _total = yield Manager.query().count("* as total").first()
        _active = yield Manager.query().where('active', '1').count("* as total").first()
        _percent = Helper.number2percent(_total.total, _active.total)
        statistics['managers'] = {
            total: _total.total,
            active: _active.total,
            percent: _percent
        }
        // ...
        _total = yield Report.query().count("* as total").first()
        statistics['reports'] = {
            total: _total.total
        }

        yield response.sendView('home', {
            orders: orders.toJSON(),
            drivers: drivers.toJSON(),
            statistics: statistics
        })
    }

}

module.exports = HomeController
