
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },

    passwordHash: {
      type: String,
      required: true
    },

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    birthday: { type: Date, required: true }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", UserSchema);
