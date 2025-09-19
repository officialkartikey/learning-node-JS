const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// ✅ Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/crudDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ Create Schema & Model
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model("User", UserSchema);

// ================== CRUD APIs ==================

// 👉 CREATE (POST)
app.post("/users", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

// 👉 READ (GET all users)
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

// 👉 READ (GET single user by ID)
app.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send("User not found");
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

// 👉 UPDATE (PUT by ID)
app.put("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).send("User not found");
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

// 👉 DELETE (by ID)
app.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).send("User not found");
        res.send({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).send(err);
    }
});

// ✅ Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
