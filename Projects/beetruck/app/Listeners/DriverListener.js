'use strict'

const Driver = use('App/Model/Driver')

const DriverListener = exports = module.exports = {}

DriverListener.upCoin = function* (driver_id, coin) {
	const driver = yield Driver.find(driver_id)
	driver.coin += coin
	yield driver.save()
}
