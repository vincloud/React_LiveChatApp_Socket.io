const { METHODS } = require('http');

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: ['http://localhost:3000'],
        METHODS: ["GET", "POST"]

    }
});

io.on("connection", (socket) => {
    console.log("user Connected:", `${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`user with id: ${socket.id} joined room ${data}`);
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data)
        console.log(data);
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected", `${socket.id}`);
    })
});





http.listen(3001, () => {
    console.log("Server Runnig on 3001");
})