const router = require("express").Router();
const bodyParser = require("body-parser")();
const fileUpload = require("express-fileupload");

router.use(fileUpload());

const analisysControler = require("../controlers/analisysControlers");

//serving styles and other static files.
router.use(require("express").static("public"));

//delivers the file form.
router.get("/file", analisysControler.file_get);

//handles the submition of the text to be analyzed in plaintext or as a file.
router.post("/file", analisysControler.file_post);

//handles the delivery of the text form
router.get("/text", analisysControler.text_get);

//handles the submition of the text to be analyzed in plaintext. receives json format.
router.post("/text", bodyParser, analisysControler.text_post);

module.exports = router;
