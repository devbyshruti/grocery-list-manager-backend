import { supabase } from "../config/supabaseClient.js";

export const createItem = async (req, res) => {
  const { name, category, quantity, price } = req.body;

  const { data, error } = await supabase
    .from("grocery_items")
    .insert([
      {
        user_id: req.user.id,
        name,
        category,
        quantity,
        price,
        is_completed: false,
      },
    ])
    .select();

  if (error) return res.status(400).json({ message: error.message });

  res.status(201).json(data);
};

export const getItems = async (req, res) => {
  const { data, error } = await supabase
    .from("grocery_items")
    .select("*")
    .eq("user_id", req.user.id);

  if (error) return res.status(400).json({ message: error.message });

  res.json(data);
};

export const updateItem = async (req, res) => {
  const { id } = req.params;
  const { is_completed } = req.body;

  const { data, error } = await supabase
    .from("grocery_items")
    .update({ is_completed })
    .eq("id", id)
    .eq("user_id", req.user.id) 
    .select();

  if (error) return res.status(400).json({ message: error.message });

   if (!data.length) {
    return res.status(404).json({ message: "Item not found or unauthorized" });
  }

  res.json(data);
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("grocery_items")
    .delete()
    .eq("id", id)
    .eq("user_id", req.user.id)
    .select();

  if (error) return res.status(400).json({ message: error.message });

  if (!data.length) {
    return res.status(404).json({ message: "Item not found or unauthorized" });
  }

  res.json({ message: "Item removed successfully" });
};

export const getTotalBudget = async (req, res) => {
  const { data, error } = await supabase
    .from("grocery_items")
    .select("price, quantity")
    .eq("user_id", req.user.id);

  if (error) return res.status(400).json({ message: error.message });

  const total = data.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  res.json({ total });
};