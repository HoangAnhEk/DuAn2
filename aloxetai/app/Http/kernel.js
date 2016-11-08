'use strict'

const Middleware = use('Middleware')

/*
 |--------------------------------------------------------------------------
 | Middleware chung
 |--------------------------------------------------------------------------
 |
 */
const globalMiddleware = [
	'Adonis/Middleware/Cors',
	'Adonis/Middleware/BodyParser',
	'Adonis/Middleware/Shield',
	'Adonis/Middleware/Flash',
	'Adonis/Middleware/AuthInit'
]

/*
 |--------------------------------------------------------------------------
 | Đặt tên cho Middleware
 |--------------------------------------------------------------------------
 |
 */
const namedMiddleware = {
	SessionAuth: 'App/Http/Middleware/SessionAuth',
	JwtAuth: 'App/Http/Middleware/JwtAuth',
	AdonisAuth: 'Adonis/Middleware/Auth'
}

/*
 |--------------------------------------------------------------------------
 | Đăng ký Middleware
 |--------------------------------------------------------------------------
 |
 */
Middleware.global(globalMiddleware)
Middleware.named(namedMiddleware)
