import { Router } from "express";
var router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    app: "My App",
    title: "My app title!",
    imgPlaceholder: "http://localhost:4000/images/placeholder.png",
  });
});

export default router;
