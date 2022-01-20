const express = require('express');
const changeCase = require('change-case');
const routes = require('require-dir')();

const router = express.Router();

router.get('/', (req, res) => res.send(`API for ${process.env.NODE_ENV}`));

Object.keys(routes).forEach((routeName) => {
  router.use(`/${changeCase.paramCase(routeName)}`, require(`./${routeName}`)());  // eslint-disable-line
});

// router.use('/list', require('./list')());

module.exports = router;
