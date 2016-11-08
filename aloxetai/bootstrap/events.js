'use strict'

/*
 |--------------------------------------------------------------------------
 | Cấu trúc liên kết các sự kiện hoạt động ngầm
 |--------------------------------------------------------------------------
 |
 */
const Event = use('Event')

Event.when('Http.error.*', 'Http.handleError')
Event.when('Http.start', 'Http.onStart')

// ...
Event.when('coin.add', 'Coin.addCoin')
