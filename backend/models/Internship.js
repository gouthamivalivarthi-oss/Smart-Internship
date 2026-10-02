import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide an internship title'],
      trim: true
    },
    company: {
      type: String,
      required: [true, 'Please provide the company name'],
      trim: true
    },
    companyLogo: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      required: [true, 'Please provide a location'],
      default: 'Remote'
    },
    type: {
      type: String,
      enum: ['Remote', 'On-site', 'Hybrid'],
      default: 'Remote'
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      default: 'Software Engineering'
    },
    description: {
      type: String,
      required: [true, 'Please provide a job description']
    },
    requirements: {
      type: [String],
      default: []
    },
    skillsRequired: {
      type: [String],
      required: [true, 'Please provide at least one required skill'],
      default: []
    },
    stipend: {
      amount: { type: Number, default: 0 },
      currency: { type: String, default: 'USD' },
      period: { type: String, default: 'month' }
    },
    stipendDisplay: {
      type: String,
      default: '$3,000 / month'
    },
    deadline: {
      type: Date,
      required: [true, 'Please specify an application deadline']
    },
    startDate: {
      type: Date
    },
    duration: {
      type: String,
      default: '3 Months (Summer)'
    },
    applyUrl: {
      type: String,
      default: ''
    },
    contactEmail: {
      type: String,
      default: ''
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    active: {
      type: Boolean,
      default: true
    },
    featured: {
      type: Boolean,
      default: false
    },
    applicantsCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

internshipSchema.index({ title: 'text', company: 'text', description: 'text', skillsRequired: 'text' });

const Internship = mongoose.model('Internship', internshipSchema);
export default Internship;
