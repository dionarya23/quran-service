const express = require('express');

const { surah } = require('../controllers/surah/surah-detail.controller');

module.exports = () => {
  const router = express.Router();
  router.get('/:surah_id', surah);

  return router;
};
