//imports and constants
const express = require("express");
const app = express();
const homeRoutes = require("../routes/publicRoutes");
const analisysRoutes = require("../routes/analisysRoutes");
const apiRoutes = require("../routes/apiRoutes");
const port = process.env.PORT || 3000;

//set view engine and public files
app.set("view engine", "ejs");
//app.use(express.static("public"));

//routes
//home and puclic routes
app.use("/", homeRoutes);

//result page with the analisys of the text  or file submitted
app.use("/analisys", analisysRoutes);
app.use("/api", apiRoutes);

//404 Routes
app.use("*", (req, res) => res.status(404).render("notFound"));

//start app
app.listen(port, () => console.log(`listening on port ${port}`));
