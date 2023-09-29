import mongoose, { Schema } from "mongoose";


const messageSchema = new Schema({
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
