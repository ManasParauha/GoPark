import mongoose, { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['host', 'parker'], required: true },

  // Host-specific fields
  address: { type: String },
  spaceType: { type: String }, // e.g., 'covered', 'open', etc.
  pricePerHour: { type: Number },

  // Parker-specific fields
  vehicleType: { type: String }, // e.g., 'car', 'bike', etc.
}, {
  timestamps: true,
})
const User = mongoose.models.users || mongoose.model("users",userSchema)
export default User;
