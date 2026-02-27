import express from "express";
import { getRecipes, getSuggestedRecipes } from "../controllers/recipeController.js";
import { protect } from "../middleware/authMiddleware.js";

console.log("Recipe routes loaded");

const router = express.Router();

router.get("/suggestions", protect, getSuggestedRecipes);

router.get("/", getRecipes);

export default router;