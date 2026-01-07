require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/users");

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

// Route registration
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Connect to MongoDB THEN start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection failed", err);
  });
