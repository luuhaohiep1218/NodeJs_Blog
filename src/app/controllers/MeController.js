const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");

class MeController {
  // [GET] /stored/courses
  storedCourses(req, res, next) {
    Promise.all([
      Course.find({}),
      Course.countDocumentsWithDeleted({ deleted: true }),
    ])
      .then(([courses, deletedCount]) => {
        res.render("me/stored-courses", {
          deletedCount,
          courses: mutipleMongooseToObject(courses),
        });
      })
      .catch(next);
    //   Course.countDocumentsDeleted()
    //     .then((deletedCount) => {})
    //     .catch(next);

    //   Course.find({})
    //     .then((courses) => {
    //       res.render("me/stored-courses", {
    //         courses: mutipleMongooseToObject(courses),
    //       });
    //     })
    //     .catch(next);
  }

  // [GET] /trash/courses
  trashCourses(req, res, next) {
    Course.findWithDeleted({ deleted: true })
      .then((courses) => {
        res.render("me/trash-courses", {
          courses: mutipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }
}

module.exports = new MeController();
