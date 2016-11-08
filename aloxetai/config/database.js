'use strict'

const Env = use('Env')
const Helpers = use('Helpers')

module.exports = {

    /*
     |--------------------------------------------------------------------------
     | Kết nối mặc định
     |--------------------------------------------------------------------------
     |
     */
    connection: Env.get('DB_CONNECTION', 'sqlite'),

    /*
     |--------------------------------------------------------------------------
     | Sqlite
     |--------------------------------------------------------------------------
     |
     | npm i --save sqlite3
     |
     */
    sqlite: {
        client: 'sqlite3',
        connection: {
            filename: Helpers.databasePath('development.sqlite')
        },
        useNullAsDefault: true
    },

    /*
     |--------------------------------------------------------------------------
     | MySQL
     |--------------------------------------------------------------------------
     |
     | npm i --save mysql
     |
     */
    mysql: {
        client: 'mysql',
        connection: {
            host: Env.get('DB_HOST', 'localhost'),
            user: Env.get('DB_USER', 'root'),
            password: Env.get('DB_PASSWORD', ''),
            database: Env.get('DB_DATABASE', 'adonis')
        }
    },

    /*
     |--------------------------------------------------------------------------
     | PostgreSQL
     |--------------------------------------------------------------------------
     |
     | npm i --save pg
     |
     */
    pg: {
        client: 'pg',
        connection: {
            host: Env.get('DB_HOST', 'localhost'),
            user: Env.get('DB_USER', 'root'),
            password: Env.get('DB_PASSWORD', ''),
            database: Env.get('DB_DATABASE', 'adonis')
        }
    }

}
