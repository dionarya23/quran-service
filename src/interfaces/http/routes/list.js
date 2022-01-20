const express = require('express');

const { list } = require('../controllers/list/list-surat.controller');

module.exports = () => {
  const router = express.Router();
  router.get('/', list);

  return router;
};
