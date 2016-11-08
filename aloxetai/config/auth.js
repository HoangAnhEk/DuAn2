'use strict'

const Config = use('Config')

module.exports = {

    /*
     |--------------------------------------------------------------------------
     | Xác thực tài khoản
     |--------------------------------------------------------------------------
     |
     */
    authenticator: 'session', // basic, session, jwt, api

    /*
     |--------------------------------------------------------------------------
     | Session
     |--------------------------------------------------------------------------
     |
     */
    session: {
        serializer: 'Lucid',
        model: 'App/Model/Manager',
        scheme: 'session',
        uid: 'phone',
        password: 'password'
    },

    /*
     |--------------------------------------------------------------------------
     | Basic Auth
     |--------------------------------------------------------------------------
     |
     */
    basic: {
        serializer: 'Lucid',
        model: 'App/Model/Manager',
        scheme: 'basic',
        uid: 'phone',
        password: 'password'
    },

    /*
     |--------------------------------------------------------------------------
     | JWT
     |--------------------------------------------------------------------------
     |
     */
    jwt: {
        serializer: 'Lucid',
        model: 'App/Model/Driver',
        scheme: 'jwt',
        uid: 'phone',
        password: 'password',
        secret: Config.get('app.appKey')
    },

    /*
     |--------------------------------------------------------------------------
     | API
     |--------------------------------------------------------------------------
     |
     */
    api: {
        serializer: 'Lucid',
        model: 'App/Model/Token',
        scheme: 'api'
    }

}

