const router = require("express").Router();
const jsonParser = require("body-parser").json();
const fileUpload = require("express-fileupload");

router.use(fileUpload());

const analisysControler = require("../controlers/analisysControlers");

//serving styles and other static files.
router.use(require("express").static("public"));

//handles the submition of the text to be analyzed in plaintext or as a file.
router.post("/file", analisysControler.file_post);

//handles the submition of the text to be analyzed in plaintext. receives json format.
router.post("/text", jsonParser, analisysControler.text_post);

module.exports = router;
