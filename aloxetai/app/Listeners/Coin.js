'use strict'

const Driver = use('App/Model/Driver')
const Coin = exports = module.exports = {}

/**
 * chạy ngầm sự kiện nạp xu trên giao diện trực quan
 *
 * @param  {Object} coin
 */
Coin.addCoin = function* (coin) {
	const driver = yield Driver.find(coin.driver_id)
	driver.coin += coin.coin
	yield driver.save()
}
