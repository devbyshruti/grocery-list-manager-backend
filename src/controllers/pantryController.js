import { supabase } from "../config/supabaseClient.js";

export const addPantryItem = async (req, res) => {
  const { name, quantity, expiry_date } = req.body;

  const { data, error } = await supabase
    .from("pantry_items")
    .insert([
      {
        user_id: req.user.id,
        name,
        quantity,
        expiry_date,
      },
    ])
    .select();

  if (error) return res.status(400).json({ message: error.message });

  res.status(201).json(data);
};

export const getPantryItems = async (req, res) => {
  const { data, error } = await supabase
    .from("pantry_items")
    .select("*")
    .eq("user_id", req.user.id);

  if (error) return res.status(400).json({ message: error.message });

  res.json(data);
};