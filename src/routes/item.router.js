import { Router } from "express";
import controllers from "../controllers/item.controllers";

var router = Router();

/* GET items listing. */
router
  .route("/items")
  .get(controllers.getMany)
  .post(controllers.createOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne);

router.route("/items/:itemId").get(controllers.getOne);

export default router;
