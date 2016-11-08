'use strict'

/*
 |--------------------------------------------------------------------------
 | Router
 |--------------------------------------------------------------------------
 |
 | Điều chỉnh các liên kết đến với các router với các phương thức
 | thông dụng như GET, POST, HEAD, OPTION, DELETE
 |
 */

const Route = use('Route')

Route.group('default-routes', () => {

    // Dashboard
    Route.get('/', 'HomeController.index')

    // Resources
    Route.resources('orders', 'OrderController')
    Route.resources('categories', 'CategoryController')
    Route.resources('offices', 'OfficeController')
    Route.resources('permissions', 'PermissionController')
    Route.resources('prices', 'PriceController')
    Route.resources('weights', 'WeightController')
    Route.resources('reports', 'ReportController')
    Route.resources('coins', 'CoinController')
    Route.resources('managers', 'ManagerController').addMember('state')
    Route.resources('drivers', 'DriverController').addMember('state').addMember('coin')
    
    //Route.resources('notifications', 'NotificationController')

}).middleware('SessionAuth')

// Statistics
Route.group('statistic-routes', () => {

    Route.get('/order', 'StatisticController.order')
    Route.get('/coin', 'StatisticController.coin')
    Route.get('/driver', 'StatisticController.driver')
    Route.get('/manager', 'StatisticController.manager')

}).prefix('/statistics').middleware('SessionAuth')

// Ajax JSON
Route.group('ajax-routes', () => {

    Route.get('/ajax/driver/search', 'AjaxController.findDriver')
    Route.get('/ajax/compute/price', 'AjaxController.computePrice')
    Route.get('/ajax/statistic/order', 'AjaxController.statisticOrder')

}).middleware('SessionAuth').formats(['json'], true)

// Authentication
Route.group('authentication-routes', () => {

    Route.get('/login', 'LoginController.index')
    Route.post('/login', 'LoginController.login')
    Route.post('/logout', 'LoginController.logout')

})

Route.group('api-routes', () => {

    Route.group('api-authentication-routes', () => {
        Route.post('/login', 'Api/LoginController.login')
        Route.post('/logout', 'Api/LoginController.logout')
    }).prefix('/api')

    Route.group('api-data-routes', () => {
        Route.get('/profile', 'Api/ProfileController.index')
        Route.post('/changepassword', 'Api/ProfileController.changePassword')
    }).prefix('/api/v1').middleware('JwtAuth')

})
