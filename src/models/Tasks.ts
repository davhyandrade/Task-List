import mongoose from 'mongoose';

const tasksSchema = new mongoose.Schema({
  title_task: {
    type: String,
    required: true,
  },
  body_task: {
    type: String,
    required: true,
  },
});

export default mongoose.models.tasks || mongoose.model('tasks', tasksSchema);
