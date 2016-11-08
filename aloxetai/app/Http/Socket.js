'use strict'

const Ioc = require('adonis-fold').Ioc

module.exports = (server) => {
    const io = use('socket.io')(server)
    /*io.on('connection', (socket) => { })*/
    Ioc.bind('AloXeTai/Src/Socket', (app) => {
        return io
    })
}