'use strict'

module.exports = {
    /*
     |--------------------------------------------------------------------------
     | Giới hạn dữ liệu gửi đến
     |--------------------------------------------------------------------------
     |
     */
    limit: '1mb',

    /*
     |--------------------------------------------------------------------------
     | Strict
     |--------------------------------------------------------------------------
     |
     */
    strict: true,

    qs: {
        /*
         |--------------------------------------------------------------------------
         | Depth
         |--------------------------------------------------------------------------
         |
         */
        depth: 5,

        /*
         |--------------------------------------------------------------------------
         | Giới hạn tham số truyền vào
         |--------------------------------------------------------------------------
         |
         */
        parameterLimit: 1000,

        /*
         |--------------------------------------------------------------------------
         | Delimiter
         |--------------------------------------------------------------------------
         |
         */
        delimiter: '&',

        /*
         |--------------------------------------------------------------------------
         | Allow Dots
         |--------------------------------------------------------------------------
         |
         */
        allowDots: false
    },
    uploads: {

        /*
         |--------------------------------------------------------------------------
         | Multiple
         |--------------------------------------------------------------------------
         |
         */
        multiple: true,

        /*
         |--------------------------------------------------------------------------
         | CheckSums
         |--------------------------------------------------------------------------
         |
         */
        hash: false, // md5, sha1

        /*
         |--------------------------------------------------------------------------
         | Max Upload Size
         |--------------------------------------------------------------------------
         |
         */
        maxSize: '2mb'
    }
}
