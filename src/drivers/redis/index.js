const redis = require('redis');
const { myLogger } = require('../../helpers/logger');

const redisOptions = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  prefix: 'quran-service-',
  legacyMode: true,
};

if (['production', 'staging', 'dev'].includes(process.env.NODE_ENV)) {
  redisOptions.tls = { checkServerIdentity: () => undefined };
}

const client = redis.createClient(redisOptions);

client.on('connect', () => {
  myLogger.info('redis', 'Client connected to redis...');
});

client.on('reconnecting', () => {
  myLogger.error('redis', 'reconnecting');
});

client.on('ready', () => {
  myLogger.info('redis', 'Client ready to redis...');
});

client.on('warning', (err) => {
  myLogger.error('redis', 'warning', err);
});

client.on('end', () => {
  myLogger.error('redis', 'end');
});

client.on('error', (err) => {
  myLogger.error('redis', err);
});

module.exports = client;
