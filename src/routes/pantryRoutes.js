import express from "express";
import {
  addPantryItem,
  getPantryItems,
  deletePantryItem
} from "../controllers/pantryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(protect, addPantryItem)
  .get(protect, getPantryItems);

 router.delete("/:id", protect, deletePantryItem);

export default router;