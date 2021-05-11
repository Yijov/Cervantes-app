//returns the homepage
module.exports.home_get = (req, res) => {
  res.status(200).render("home");
};
