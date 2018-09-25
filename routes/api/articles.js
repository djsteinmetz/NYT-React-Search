const router = require("express").Router();
const articlesController = require("../../controllers/articleController");

// Matches with "/api/articles"
router.route("/")
  .get(articlesController.findAll)

// Matches with "/api/article/:id"
router
  .route("/:id")
  .get(articlesController.findById)
  .put(articlesController.update)
  .delete(articlesController.remove);

router
  .route("/")
  .post(articlesController.create)

module.exports = router;
