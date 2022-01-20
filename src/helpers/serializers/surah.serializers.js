const { setRedisData, getRedisData } = require('../redis');

const responseSerialize = async (data, surahId) => {
  const surahBuilder = {
    id: surahId,
    name: data[surahId].name,
    name_latin: data[surahId].name_latin,
    number_of_ayat: parseInt(data[surahId].number_of_ayah, 10),
    translation_name: data[surahId].translations.id.name,
    list_ayat: [],
  };
  const arabicText = Object.values(data[surahId].text);
  const translationText = Object.values(data[surahId].translations.id.text);
  for (let i = 0; i < arabicText.length; i += 1) {
    surahBuilder.list_ayat.push({
      arabic_text: arabicText[i],
      translation_text: translationText[i],
      ayat_number: i + 1,
    });
  }
  await setRedisData(`surah_${surahId}`, surahBuilder);
  return surahBuilder;
};

module.exports = {
  async serialize(data, surahId) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null');
    }
    const surah = await getRedisData(`surah_${surahId}`);
    if (surah) {
      return surah;
    }
    return responseSerialize(data, surahId);
  },
};
