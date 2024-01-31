const app = require('.')

const server= require('http').createServer(app)

const io = require('socket.io')(server)

const port= process.env.PORT

server.listen(port, ()=>{
    console.log(`connected to port ${port}`)
})

