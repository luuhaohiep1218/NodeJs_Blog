const Course = require("../models/Course");
const { mongooseToObject } = require("../../util/mongoose");

class CourseController {
  // [GET] /courses/:slug
  show(req, res, next) {
    req.params.slug;
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render("courses/show", {
          course: mongooseToObject(course),
        });
      })
      .catch(next);
  }
  // [GET] /courses/create
  create(req, res, next) {
    res.render("courses/create");
  }
  // [POST] /courses/store
  async store(req, res, next) {
    const course = new Course(req.body);
    await course
      .save()
      .then(() => res.redirect("/"))
      .catch((error) => {});
  }
}

module.exports = new CourseController();
