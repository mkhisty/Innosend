import { Server } from "socket.io";

async function initSocket() {
    if(global.io) {
        console.log('Socket already running')
        return
    }
    console.log("init socket")
    const io = new Server(8080, {
        cors: {
            origin: "http://localhost:3000"
        }
    })
    global.io = io

    io.on('connection', socket => {
        socket.on('message', (data) => {
            io.emit('message', data)
        })
    })
}

export default initSocket