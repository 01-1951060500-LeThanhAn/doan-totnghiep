const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: {
    type: Array,
    required: true,
    default: [],
  },
});

export default mongoose.model("role", RoleSchema);
