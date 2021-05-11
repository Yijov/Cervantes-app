//cconsult sinonims
const axios = require("axios");
module.exports.sinonims_get = async (req, res) => {
  axios
    .get(
      `http://sesat.fdi.ucm.es:8080/servicios/rest/sinonimos/json/${req.params.id}`
    )
    .then((response) => {
      res.status(200).json({ sinonims: response.data.sinonimos });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};
