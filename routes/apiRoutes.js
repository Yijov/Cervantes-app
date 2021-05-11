//proxy for requesting sinonims to external api
const router = require("express").Router();

const apiController = require("../controlers/apiControlers");

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

router.get("/sinonims/:id", apiController.sinonims_get);

module.exports = router;
