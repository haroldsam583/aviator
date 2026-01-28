// server.js
import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/aviator", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  balance: Number,
});
const User = mongoose.model("User", userSchema);

// Get balance
app.get("/user/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// Deposit
app.post("/deposit", async (req, res) => {
  const { userId, amount } = req.body;
  const user = await User.findById(userId);
  user.balance += amount;
  await user.save();
  res.json(user);
});

// Withdraw
app.post("/withdraw", async (req, res) => {
  const { userId, amount } = req.body;
  const user = await User.findById(userId);
  if (user.balance >= amount) user.balance -= amount;
  else return res.status(400).json({ error: "Insufficient balance" });
  await user.save();
  res.json(user);
});

app.listen(5000, () => console.log("Server running on port 5000"));
