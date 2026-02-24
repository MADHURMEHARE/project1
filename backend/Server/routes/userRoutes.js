const express = require("express");
const router = express.Router();

let users = []; // temporary storage

// GET users
router.get("/", (req, res) => {
  res.json(users);
});

// POST user
router.post("/", (req, res) => {
  const newUser = {
    _id: Date.now().toString(),
    email: req.body.email,
    password: req.body.password,
    gender: req.body.gender,
    photo: null
  };

  users.push(newUser);
  res.json(newUser);
});

// DELETE user
router.delete("/:id", (req, res) => {
  users = users.filter(user => user._id !== req.params.id);
  res.json({ message: "Deleted" });
});

// UPDATE user
router.put("/:id", (req, res) => {
  users = users.map(user =>
    user._id === req.params.id
      ? { ...user, ...req.body }
      : user
  );

  res.json({ message: "Updated" });
});

module.exports = router;   // ⚠ VERY IMPORTANT