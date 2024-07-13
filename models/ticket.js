import mongoose, { Schema, models } from "mongoose";

const brandSchema = new Schema({
  tname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["Processing", "Complete"],
    default: "Processing",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
});

const Ticket = models.Ticket || mongoose.model("Ticket", brandSchema);
export default Ticket;
