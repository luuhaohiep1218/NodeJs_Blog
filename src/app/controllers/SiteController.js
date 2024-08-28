const Course = require("../models/Course");

class SiteController {
  // [GET] /
  async home(req, res) {
    // const courses = await Course.find({});

    // res.json({ courses });

    res.render('home');
  }

  // [GET] /search
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
