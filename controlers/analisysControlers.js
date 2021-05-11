const Analisys = require("./AnalisysClass/AnalisysClass");
var docxParser = require("docx-parser");

module.exports.file_post = async (req, res) => {
  const sampleFile = req.files.sampleFile;
  const uploadPath = __dirname + "/uploads/" + sampleFile.name;

  //move the file to the  uploads forder
  await sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);
  });

  //process the uploaded
  try {
    docxParser.parseDocx(sampleFile.data, async function (TEXT) {
      let result = await new Analisys(TEXT);
      res.status(200).render("analisys", {
        repetitions: result.repetitions,
        paragraphsWithLowVariation: result.paragraphsWithLowVariation,
        longsentences: result.paragraphsWithLargeSentences,
        numberOfWords: result.numberOfWords,
      });
    });
  } catch (error) {
    res.status(500).send(error);
  }
};






//handle plain text posting
module.exports.text_post = async (req, res) => {
  try {
    let result = await new Analisys(req.body.narrative);
    res.status(200).render("analisys", {
      repetitions: result.repetitions,
      paragraphsWithLowVariation: result.paragraphsWithLowVariation,
      longsentences: result.paragraphsWithLargeSentences,
      numberOfWords: result.numberOfWords,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
