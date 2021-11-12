const redis = require('redis');
const REDISURL = require('../config/config').module.REDISURL

const client = redis.createClient(REDISURL);

const cache = async (req, res, next) => {
    client.get('Products', (err,data) => {
        if (err) throw err;
        if (data) res.status(200).json(JSON.parse(data))
            else next();
    })
}

module.exports = {client, cache};





