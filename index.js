

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
app.use(express.static('public'));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.get("/test", (req, res) => {
    res.send("fuck");
})
users = [];
connections = [];

io.on('connection', socket => {
    connections.push(socket);
    console.log(connections.length);
    socket.on('message', data => {
        io.emit('message', data)
    });
    socket.on('disconnect', (socket) => {
        connections.splice(connections.indexOf(socket), 1);
    });


});


server.listen(3000);