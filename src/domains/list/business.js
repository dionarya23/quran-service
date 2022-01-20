const { myLogger } = require('../../helpers/logger');

const filePath = 'src/domains/list/business';

module.exports = {
  async process() {
    try {
      // eslint-disable-next-line global-require
      const surah = require('../../drivers/quran_data/surah-info.json');
      return { data: surah };
    } catch (error) {
      myLogger.error(`${filePath}/process`, error.message);
      throw error;
    }
  },
};
