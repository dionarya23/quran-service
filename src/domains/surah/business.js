/* eslint-disable global-require */
const { myLogger } = require('../../helpers/logger');

const filePath = 'src/domains/surah/business';

module.exports = {
  async process({ surahId }) {
    try {
      // eslint-disable-next-line import/no-dynamic-require
      const surah = require(`../../drivers/quran_data/${surahId}.json`);
      return { data: surah };
    } catch (error) {
      myLogger.error(`${filePath}/process`, error.message);
      throw error;
    }
  },
};
