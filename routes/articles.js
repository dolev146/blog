const express = require("express");
const Article = require("./../models/article");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/:id",async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article == null) res.redirect('/')
  res.render("articles/show", { article });
});

router.post("/", async (req, res) => {
  console.log(req.body.title);
  console.log(req.body.description);
  console.log(req.body.markdown);
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });

  try {
    article = await article.save();
    console.log(article)
     console.log(article.id);
    res.redirect(`/articles/${article.id}`);
  } catch (error) {
    console.log(error);
    res.render("articles/new", { article: article });
  }
});

module.exports = router;
