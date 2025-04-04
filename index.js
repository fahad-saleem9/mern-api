const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User"); 

const app = express();
const PORT = 3000;


app.use(express.json());


const mongoURI =
  "mongodb+srv://Fahad911:Fahadsaleem911@cluster1.nsxig.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster1"; 


mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((err) => console.log("MongoDB Atlas connection error: ", err));


app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find(); 
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id); 
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.post("/api/users", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
  });

  try {
    const savedUser = await newUser.save(); 
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.put("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id); 
    if (user) {
      user.name = req.body.name;
      const updatedUser = await user.save(); 
      res.json(updatedUser);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.delete("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id); 
    if (user) {
      await user.remove(); 
      res.send("User deleted");
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
