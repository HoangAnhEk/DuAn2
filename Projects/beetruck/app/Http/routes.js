'use strict'

const Route = use('Route')

Route.group('manager-routes', () => {

    // resource
    Route.resources('orders', 'OrderController').addCollection('calc').addMember('driver')
    Route.resources('categories', 'CategoryController')
    Route.resources('offices', 'OfficeController')
    Route.resources('permissions', 'PermissionController')
    Route.resources('prices', 'PriceController')
    Route.resources('weights', 'WeightController')
    Route.resources('reports', 'ReportController').addCollection('drivers')
    Route.resources('coins', 'CoinController').addCollection('drivers')
    Route.resources('managers', 'ManagerController').addMember('state')
    Route.resources('drivers', 'DriverController').addMember('state').addMember('coin')

    // dashboard
    Route.get('/', 'HomeController.index')

}).middleware('Manager')

// auth
Route.group('auth-routes', function () {

    Route.get('/login', 'LoginController.index')
    Route.post('/login', 'LoginController.login')
    Route.delete('/logout', 'LoginController.logout')

}).prefix('/auth')
