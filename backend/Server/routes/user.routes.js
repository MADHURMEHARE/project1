const express = require("express");
const router = express.Router();
const userService = require("../services/user.service");

// GET
router.get("/", async (req, res) => {
  const users = await userService.getUsers();
  res.json(users);
});

// POST
router.post("/", async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res.json(user);
     console.log("REQ BODY:", req.body); 
  } catch (err) {
    res.status(400).json({ error: err.message });
     console.log("BACKEND ERROR:", err);
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.json({ message: "Deleted" });
});

// UPDATE
router.put("/:id", async (req, res) => {
  await userService.updateUser(req.params.id, req.body);
  res.json({ message: "Updated" });
});

module.exports = router;