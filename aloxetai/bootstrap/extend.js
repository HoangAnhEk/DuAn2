'use strict'

const Ioc = require('adonis-fold').Ioc

/*
 |--------------------------------------------------------------------------
 | Mở rộng các Providers
 |--------------------------------------------------------------------------
 |
 | @vd
 | Ioc.extend('Toan/Dev/Bmt', 'dosomthing', function (app) {
 |   // ...
 | })
 |
 */

Ioc.bind('AloXeTai/Src/Config', () => {
    return require('../config/aloxetai')
})

Ioc.bind('AloXeTai/Src/Toanid', () => {
    return require('../providers/Toanid')
})

Ioc.bind('AloXeTai/Src/Helper', () => {
    return require('../providers/Helper')
})