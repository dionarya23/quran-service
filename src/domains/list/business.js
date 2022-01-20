const { setRedisData, getRedisData } = require('../../helpers/redis');

const { myLogger } = require('../../helpers/logger');

const filePath = 'src/domains/list/business';

module.exports = {
  async process() {
    try {
      const surahList = await getRedisData('surah_list');
      if (surahList) {
        return { data: surahList };
      // eslint-disable-next-line no-else-return
      } else {
        // eslint-disable-next-line no-shadow
        // eslint-disable-next-line global-require
        const surah = require('../../drivers/quran_data/surah-info.json');
        setRedisData('surah_list', surah);
        return { data: surah };
      }
    } catch (error) {
      myLogger.error(`${filePath}/process`, error.message);
      throw error;
    }
  },
};
