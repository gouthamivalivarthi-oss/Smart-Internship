import mongoose from 'mongoose';

const interviewQuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  category: { type: String, default: 'technical' },
  difficulty: { type: String, default: 'Medium' },
  hint: { type: String, default: '' },
  practiceAnswer: { type: String, default: '' }
});

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true
    },
    company: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    roundTitle: {
      type: String,
      required: [true, 'Please provide an interview round name'],
      default: 'Technical Interview'
    },
    scheduledDate: {
      type: Date,
      required: [true, 'Please select interview date and time']
    },
    durationMinutes: {
      type: Number,
      default: 45
    },
    locationOrLink: {
      type: String,
      default: 'https://meet.google.com'
    },
    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Rescheduled', 'Cancelled'],
      default: 'Scheduled'
    },
    interviewers: {
      type: [String],
      default: []
    },
    notes: {
      type: String,
      default: ''
    },
    aiQuestions: {
      type: [interviewQuestionSchema],
      default: []
    },
    feedback: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

const Interview = mongoose.model('Interview', interviewSchema);
export default Interview;
