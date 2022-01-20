const log4js = require('log4js');

const logconfig = {
  appenders: {
    service: {
      type: 'file',
      filename: 'logs/service.log',
      maxLogSize: 102400000,
      backups: 50,
      category: 'service',
      layout: { type: 'messagePassThrough' },
    },
    access: {
      type: 'dateFile',
      filename: 'logs/access.log',
      pattern: 'backup-yyyy-MM-dd',
      backups: 3,
      category: 'http',
      layout: { type: 'messagePassThrough' },
    },
    devlog: {
      type: 'stdout',
      layout: { type: 'messagePassThrough' },
    },
  },
  categories: {
    default: {
      appenders: ['service'],
      level: 'ALL',
    },
    access: { appenders: ['access'], level: 'DEBUG' },
  },
};

logconfig.categories.default.appenders.push('devlog');

log4js.configure(logconfig);
const logger = log4js.getLogger('service');

const myLogger = {};

myLogger.trace = (action, message) => {
  myLogger.push('trace', action, message);
};

myLogger.debug = (action, message) => {
  myLogger.push('debug', action, message);
};

myLogger.info = (action, message) => {
  myLogger.push('info', action, message);
};

myLogger.warn = (action, message) => {
  myLogger.push('warn', action, message);
};

myLogger.error = (action, message) => {
  myLogger.push('error', action, message);
};

myLogger.fatal = (action, message) => {
  myLogger.push('fatal', action, message);
};

myLogger.push = (type, action, message) => {
  let newMessage = { message };
  if (typeof message === 'object') {
    newMessage = JSON.stringify(message);
  }

  let newData = {
    time: new Date(), type, interface: process.env.INTERFACE, action, data: newMessage,
  };

  newData = JSON.stringify(newData);
  if (type === 'trace') {
    logger.trace(newData);
  } else if (type === 'debug') {
    logger.debug(newData);
  } else if (type === 'info') {
    logger.info(newData);
  } else if (type === 'warn') {
    logger.warn(newData);
  } else if (type === 'error') {
    logger.error(newData);
  } else if (type === 'fatal') {
    logger.fatal(newData);
  }
};

module.exports = {
  myLogger,
};
