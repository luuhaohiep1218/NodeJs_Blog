const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");

class SiteController {
  // [GET] /
  async home(req, res, next) {
    // const courses = await Course.find({});
    Course.find({})
      .then((courses) => {
        res.render("home", {
          courses: mutipleMongooseToObject(courses),
        });
      })
      .catch(next);
    // res.json({ courses });

    // res.render("home");
  }

  // [GET] /search
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
