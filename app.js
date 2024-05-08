const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`🗨️  server on port http://localhost:${PORT}`))

const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))

app.use('/socket.io', express.static(__dirname + '/node_modules/socket.io/client-dist'))

io.on('connection', (socket) => {
    console.log(socket.id)
})

let socketConnected = new Set()

io.on('connection', onConnected)

function onConnected(socket) {
    console.log(socket.id)
    socketConnected.add(socket.id)

    io.emit('clients-total', socketConnected.size)
    
    socket.on('disconnect', () => {
        console.log('Socket disconnected', socket.id)
        socketConnected.delete(socket.id)
        io.emit('clients-total', socketConnected.size)
    })

    socket.on('message', (data) => {
        // console.log(data)
        socket.broadcast.emit('chat-message', data)
    })

    socket.on('feedback', (data) => {
        // console.log(data)
        socket.broadcast.emit('chat-feedback', data)
    })
}