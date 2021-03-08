// const express = require("express");
// const app = express();
//const PORT = process.env.PORT || 3000;
//app.listen(PORT);

const io = require("socket.io")(3000, {cors: {
    origin: "*",
}});

const formatMessage = require('./utils/messages');

const users = {};

io.on("connection", socket => {
    socket.on("new-user", name => {
        users[socket.id] = name;
        socket.broadcast.emit("user-connected", name);
    })
    socket.on("send-chat", message => {
        socket.broadcast.emit("chat-message", formatMessage(users[socket.id], message));
    })
    socket.on("send-own", message => {
        socket.emit("self-message", formatMessage("You", message))
    })
    socket.on("disconnect", () => {
        socket.broadcast.emit("user-disconnected", users[socket.id]);
        delete users[socket.id];
    })
});