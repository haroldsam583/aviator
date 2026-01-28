const crypto = require("crypto");

function crashPoint(seed, round) {
    const hash = crypto
        .createHash("sha256")
        .update(seed + round)
        .digest("hex");

    const num = parseInt(hash.slice(0, 13), 16);
    const point = Math.max(1.0, (100 / ((num % 10000) / 100)).toFixed(2));
    return Number(point);
}

module.exports = crashPoint;
