const redis = require('redis');
const REDISPORT = parseInt(require('../config/config').module.REDISPORT)

const client = redis.createClient(REDISPORT);

const cache = async (req, res, next) => {
    client.get('Products', (err,data) => {
        if (err) throw err;
        if (data) res.status(200).json(JSON.parse(data))
            else next();
    })
}

module.exports = {client, cache};





