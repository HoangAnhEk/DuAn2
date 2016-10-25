'use strict'

const Event = use('Event')

// Lắng nghe các sự kiện của hệ thống
Event.when('Http.error.*', 'Http.handleError')
Event.when('Http.start', 'Http.onStart')

// Sự kiện khác
Event.when('coin.added', 'DriverListener.upCoin')
