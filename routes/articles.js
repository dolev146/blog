const express = require("express");
const Article = require("./../models/article");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.render("articles/edit", { article: article });
});

router.get("/:slug",async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == null) res.redirect('/')
  res.render("articles/show", { article });
});

router.post("/", async (req, res, next) => {
  req.article = new Article();
  next();
} , saveArticleAndRedirect('new'));

router.put("/:id", async (req, res, next) => {
  req.article = await Article.findById(req.params.id);
  console.log(req.article);
  next();
} , saveArticleAndRedirect('edit'));


router.delete('/:id',async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    console.log(req.body.title);
    console.log(req.body.description);
    console.log(req.body.markdown);
    
    let article = req.article
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown
      
    //   new Article({
    // title: req.body.title,
    // description: req.body.description,
    // markdown: req.body.markdown,
    // });

  

  try {
    article = await article.save();
    console.log(article)
     console.log(article.slug);
    res.redirect(`/articles/${article.slug}`);
  } catch (error) {
    console.log(error);
    res.render("articles/new", { article: article });
  }


  }
}

module.exports = router;
