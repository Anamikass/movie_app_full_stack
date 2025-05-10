const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userId: { type: Number }, // Enforce uniqueness and make it required
    email: { type: String, required: true, unique: true }, // Ensure unique emails
    first_name: { type: String, required: true }, // Use camelCase for consistency
    last_name: { type: String, required: true },
    username: { type: String, required: true, unique: true }, // Ensure unique usernames
    contact: { type: String, required: true },
    password: { type: String, required: true }, // Consider using encryption for passwords
    role: { type: String, default: "user", enum: ["admin", "user"] }, // Limited to specific values
    uuid: { type: String, unique: true }, // Ensure UUID is unique if needed
    accesstoken: { type: String }, // Use camelCase for consistency
    isLoggedIn: { type: Boolean, default: false }, // Default to false
    coupens: { type: [], default: [] }, // Use array type
    bookingRequests: { type: [], default: [] }, // Use array type
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
