const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const startGame = require("./gameEngine");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

io.on("connection", socket => {
    console.log("Player connected");

    socket.on("bet", amount => {
        socket.bet = amount;
    });

    socket.on("cashout", multiplier => {
        socket.emit("win", multiplier);
    });
});

startGame(io);

server.listen(3000, () =>
    console.log("✅ Aviator backend running on port 3000")
);
