import { supabase } from "../config/supabaseClient.js";

export const getRecipes = async (req, res) => {
  const { data, error } = await supabase
    .from("recipes")
    .select("*");

  if (error) return res.status(400).json({ message: error.message });

  res.json(data);
};

export const getSuggestedRecipes = async (req, res) => {
  try {
   
    const { data: pantryItems, error: pantryError } = await supabase
      .from("pantry_items")
      .select("name")
      .eq("user_id", req.user.id);

    if (pantryError)
      return res.status(400).json({ message: pantryError.message });

    if (!pantryItems.length)
      return res.json({ message: "No pantry items found", suggestions: [] });

    const pantryNames = pantryItems.map(item =>
      item.name.toLowerCase()
    );

   
    const { data: recipes, error: recipeError } = await supabase
      .from("recipes")
      .select("*");

    if (recipeError)
      return res.status(400).json({ message: recipeError.message });

 
  const suggestions = recipes.map(recipe => {
  const ingredients = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
    : [];

  const missingIngredients = ingredients.filter(
    ingredient => !pantryNames.includes(ingredient.toLowerCase())
  );

  return {
    name: recipe.name,
    missingIngredients,
    missingCount: missingIngredients.length
  };
})
  .sort((a, b) => a.missingCount - b.missingCount);
    res.json({
      totalRecipesChecked: recipes.length,
      suggestions
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};