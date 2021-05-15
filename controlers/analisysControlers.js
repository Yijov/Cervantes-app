const Analisys = require("./AnalisysClass/AnalisysClass");
var docxParser = require("docx-parser");

module.exports.file_get = (req, res) => {
  res.status(200).render("fileForm");
};

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
        route: 1, //indicates to the UI the current route for conditional reender of buttons
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
    let result = await new Analisys(req.body.text);

    res.status(200).render("analisys", {
      route: 2, //indicates to the UI the current route for conditional reender of buttons
      repetitions: result.repetitions,
      paragraphsWithLowVariation: result.paragraphsWithLowVariation,
      longsentences: result.paragraphsWithLargeSentences,
      numberOfWords: result.numberOfWords,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// get the txt form page
module.exports.text_get = (req, res) => {
  res.status(200).render("textForm");
};
