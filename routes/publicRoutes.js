const router = require("express").Router();
const puclicControler = require("../controlers/puclicControlers");

//serving styles and other static files
router.use(require("express").static("public"));

//geet the Home page
router.get("/", puclicControler.home_get);

module.exports = router;
