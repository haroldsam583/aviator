const crashPoint = require("./fair");

let round = 1;
let serverSeed = "AVIATOR_SECRET_SEED";

function startGame(io) {
    let multiplier = 1.0;
    const crash = crashPoint(serverSeed, round);

    const interval = setInterval(() => {
        multiplier += 0.01;
        io.emit("tick", multiplier.toFixed(2));

        if (multiplier >= crash) {
            io.emit("crash", crash);
            clearInterval(interval);
            round++;
            setTimeout(() => startGame(io), 3000);
        }
    }, 50);
}

module.exports = startGame;
