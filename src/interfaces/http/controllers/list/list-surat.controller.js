const listBusiness = require('../../../../domains/list/business');

module.exports = {
  list: async (req, res, next) => {
    try {
      const { data } = await listBusiness.process();
      res.status(200).send({
        status: true,
        message: 'OK',
        data: data.surah_info,
      });
    } catch (error) {
      next(error);
    }
  },
};
