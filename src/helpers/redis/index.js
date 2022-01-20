const redis = require('../../drivers/redis');

redis.connect();

const setRedisData = (key, data, timeout = 0, db = 0) => {
  redis.select(db, () => {
    if (timeout === 0) {
      return redis.set(key, JSON.stringify(data));
    }
    return redis.setex(key, timeout, JSON.stringify(data));
  });
};

const getRedisData = (key, db = 0) => new Promise((resolve, reject) => {
  redis.select(db, (err) => {
    if (err) return reject(err);
    return redis.get(key, (error, data) => {
      if (err) return reject(error);

      return resolve(JSON.parse(data));
    });
  });
});

const deleteRedisDara = (key, db = 0) => {
  redis.select(db, () => redis.del(key));
};

module.exports = {
  setRedisData,
  getRedisData,
  deleteRedisDara,
};
