const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const handlebars = require("express-handlebars");
const { engine } = handlebars;
const app = express();
const port = 3000;

const route = require("./routes");
const db = require("./config/db");

// Connect DB
db.connect();

app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(methodOverride("_method"));

app.use(bacBaoVe);

function bacBaoVe(req, res, next) {
  if (["vethuong", "vevip"].includes(req.query.ve)) {
    req.face = "to son len mat";
    return next();
  }
  res.status(403).json({
    message: "Bạn phải chọn vé thường hoặc vé vip",
  });
}

// HTTP logger
app.use(morgan("combined"));

// Template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Routes init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
