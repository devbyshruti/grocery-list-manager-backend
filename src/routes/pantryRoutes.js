import express from "express";
import {
  addPantryItem,
  getPantryItems,
} from "../controllers/pantryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(protect, addPantryItem)
  .get(protect, getPantryItems);

export default router;