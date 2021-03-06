const express = require("express");
const mongoose = require('mongoose')
const articleRouter = require("./routes/articles");
const Article = require('./models/article')
const marked = require('marked')
const slugify = require('slugify')
const methodOverride = require('method-override')
const app = express();
require("dotenv").config();

const mongodbPassword = process.env.Mongodb_Password

mongoose.connect(
  `mongodb+srv://Dolev_Admin:${mongodbPassword}@blog.0oakg.mongodb.net/blog`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//   // we're connected!
//   console.log("mongo connected")
// });

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))



app.get("/", async (req, res) => {
 const articles = await Article.find().sort({createdAt : 'desc'})
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);

app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
