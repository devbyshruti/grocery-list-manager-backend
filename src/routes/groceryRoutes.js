import express from "express";
import {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  getTotalBudget
} from "../controllers/groceryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/total", protect, getTotalBudget);

router.route("/")
  .post(protect, createItem)
  .get(protect, getItems);

router.route("/:id")
  .put(protect, updateItem)
  .delete(protect, deleteItem);

export default router;