import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  description: String,
  createdBy: { type: String, required: true },
});

export default mongoose.model('Event', EventSchema);
