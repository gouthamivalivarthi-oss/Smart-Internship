import mongoose from 'mongoose';

const timelineEntrySchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['Wishlist', 'Applied', 'In Review', 'Interviewing', 'Offered', 'Rejected'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  note: {
    type: String,
    default: ''
  }
});

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    internship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Internship',
      default: null
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true
    },
    companyLogo: {
      type: String,
      default: ''
    },
    role: {
      type: String,
      required: [true, 'Role/position title is required'],
      trim: true
    },
    location: {
      type: String,
      default: 'Remote'
    },
    stipend: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['Wishlist', 'Applied', 'In Review', 'Interviewing', 'Offered', 'Rejected'],
      default: 'Applied',
      index: true
    },
    appliedDate: {
      type: Date,
      default: Date.now
    },
    deadline: {
      type: Date
    },
    jobUrl: {
      type: String,
      default: ''
    },
    notes: {
      type: String,
      default: ''
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    },
    salaryOffered: {
      type: String,
      default: ''
    },
    aiMatchScore: {
      type: Number,
      default: null
    },
    aiFeedback: {
      matchedSkills: [String],
      missingSkills: [String],
      summary: String
    },
    timeline: {
      type: [timelineEntrySchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

// Auto-add first timeline entry when created
applicationSchema.pre('save', function (next) {
  if (this.isNew && (!this.timeline || this.timeline.length === 0)) {
    this.timeline.push({
      status: this.status,
      date: this.appliedDate || new Date(),
      note: `Application created with status: ${this.status}`
    });
  }
  next();
});

const Application = mongoose.model('Application', applicationSchema);
export default Application;
