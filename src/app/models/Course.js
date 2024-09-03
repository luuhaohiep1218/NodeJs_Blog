const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");
const AutoIncrement = require('mongoose-sequence')(mongoose);


mongoose.plugin(slug);

const Course = new Schema(
  {
    _id: { type: Number, require: true },
    name: { type: String, require: true },
    description: { type: String },
    image: { type: String },
    videoId: { type: String, require: true },
    level: { type: String },
    slug: { type: String, slug: "name", unique: true },
  },
  {
    _id: false,
    timestamps: true,
  }
);

// Add plugin
Course.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});
Course.plugin(AutoIncrement);

module.exports = mongoose.model("Course", Course);
