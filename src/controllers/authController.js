import bcrypt from "bcrypt";
import { supabase } from "../config/supabaseClient.js";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  console.log("BODY:", req.body);
  if (!req.body) {
    return res.status(400).json({ message: "Request body is missing" });
  }

  const { name, email, password } = req.body;

    if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([{ name, email, password: hashedPassword }])
    .select();

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.status(201).json({
    id: data[0].id,
    token: generateToken(data[0].id),
  });
};

export const loginUser = async (req, res) => {
   if (!req.body) {
    return res.status(400).json({ message: "Request body is missing" });
  }
  const { email, password } = req.body;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !data) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, data.password);

  if (!match) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.json({
    id: data.id,
    token: generateToken(data.id),
  });
};