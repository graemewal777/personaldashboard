import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Todo', TodoSchema);
