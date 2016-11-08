'use strict'

const Driver = use('App/Model/Driver')
const Price = use('App/Model/Price')
const Order = use('App/Model/Order')
const _ = use('lodash')
const moment = use('moment')

class AjaxController {

    /**
     * trả về danh sách tài xế dưới dạng json
     * với từ khóa được truyền vào
     * 
     * @param   {Object} request
     * @param   {Object} response
     * 
     * @return  {JSON}
     */
    * findDriver(request, response) {
        const keyword = `%${request.input('term')}%` || null
        const drivers = yield Driver.query()
            .select('id', 'first_name', 'last_name', 'phone')
            .where('phone', 'like', keyword)
            .orWhere('first_name', 'like', keyword)
            .orWhere('last_name', 'like', keyword)
            .fetch()
        response.json(drivers.toJSON())
    }

    /**
     * tính toán giá tiền dựa vào khoản cách
     * và loại trọng tải
     * 
     * @param   {Object} request
     * @param   {Object} response
     * 
     * @return  {JSON}
     */
    * computePrice(request, response) {
        const distance = parseInt(request.input('distance'))
        const weight_id = parseInt(request.input('weight_id'))
        const percent = parseInt(request.input('percent'))

        const prices = yield Price.query().with('levels').fetch()
        const price = _.find(prices.toJSON(), ['weight_id', weight_id])
        try {
            const level1 = price.levels[0]
            const level2 = price.levels[1]
            const level3 = price.levels[2]
            const result = {}
            if (distance <= 5000) {
                result['price'] = level1._pivot_price
            } else if (distance > 5000 && distance <= 10000) {
                result['price'] = (((distance - 5000) / 1000) * level2._pivot_price) + level1._pivot_price
            } else {
                result['price'] = (((distance - 10000) / 1000) * level3._pivot_price) + level1._pivot_price + (level2._pivot_price * 5)
            }
            result['coin'] = Math.round((result['price'] * percent) / 100000) || 0
            response.json(result)
        } catch (e) {
            response.json({ error: true })
        }
    }

    /**
     * phân tích dữ liệu vận đơn và trả về kết quả
     * json để morris char sủ dụng
     * 
     * @param   {Object} request
     * @param   {Object} response
     * 
     * @return  {JSON}
     */
    * statisticOrder(request, response) {
        let start = new Date(request.input('start'))
        let end = new Date(request.input('end'))
        // cho truy vấn lọc between
        const between = [moment(start).format('YYYY-MM-DD'), moment(end).format('YYYY-MM-DD')]
        // dữ liệu biểu đồ đường
        let lineChart = []
        while (start <= end) {
            let _total = yield Order.query()
                .whereRaw('YEAR(created_at) = ? && MONTH(created_at) = ?', [start.getFullYear(), start.getMonth() + 1])
                .count('* as total').first()
            let _complete = yield Order.query()
                .where('status', '2')
                .whereRaw('YEAR(created_at) = ? && MONTH(created_at) = ?', [start.getFullYear(), start.getMonth() + 1])
                .count('* as total').first()
            // ...
            lineChart.push({
                date: `${start.getFullYear()}-${("0" + (start.getMonth() + 1)).slice(-2)}`,
                total: _total.total,
                complete: _complete.total
            })
            start.setMonth(start.getMonth() + 1)
        }
        // dữ liệu biểu đồ tròn
        let donutChart = []
        let _accept = yield Order.query().where('status', '1')
            .whereBetween('created_at', between)
            .count('* as total').first()
        let _complete = yield Order.query().where('status', '2')
            .whereBetween('created_at', between)
            .count('* as total').first()
        let _wait = yield Order.query().where('status', '0')
            .whereBetween('created_at', between)
            .count('* as total').first()
        donutChart = [
            { "label": "Đang vận chuyển", "value": _accept.total },
            { "label": "Đã hoàn thành", "value": _complete.total },
            { "label": "Chưa nhận", "value": _wait.total }
        ]
        
        response.json({
            line: lineChart,
            donut: donutChart
        })
    }

}

module.exports = AjaxController
