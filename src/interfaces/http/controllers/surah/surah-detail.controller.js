const surahBusiness = require('../../../../domains/surah/business');
const surahValidator = require('../../../../helpers/validators/surah.validators');
const surahSerializer = require('../../../../helpers/serializers/surah.serializers');
// const { myLogger } = require('../../../../helpers/logger');

module.exports = {
  surah: async (req, res, next) => {
    try {
      const { params } = req;
      const {
        surah_id: surahId,
      } = await surahValidator(params);
      const { data } = await surahBusiness.process({ surahId });
      res.status(200).send({
        status: true,
        message: 'OK',
        data: await surahSerializer.serialize(data, surahId),
      });
    } catch (error) {
      next(error);
    }
  },
};
