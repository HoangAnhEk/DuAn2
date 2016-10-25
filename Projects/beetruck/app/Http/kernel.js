'use strict'

const Middleware = use('Middleware')

const globalMiddleware = [
    'Adonis/Middleware/Cors',
    'Adonis/Middleware/BodyParser',
    'Adonis/Middleware/Shield',
    'Adonis/Middleware/Flash',
    'Adonis/Middleware/AuthInit'
]

const namedMiddleware = {
    Manager: 'App/Http/Middleware/ManagerDetector'
}

Middleware.global(globalMiddleware)
Middleware.named(namedMiddleware)
