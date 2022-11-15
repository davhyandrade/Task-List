import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  descrimption: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  tasks: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    require: true,
  },
  completed: {
    type: Boolean,
    require: true,
    default: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Task || mongoose.model('Task', taskSchema);
