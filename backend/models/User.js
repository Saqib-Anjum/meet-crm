// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName:    { type: String,  required: true, trim: true },
  phoneNumber: { type: String,  required: true, trim: true },
  email:       { type: String,  required: true, trim: true},
  dob:         { type: Date },
  gender:      { type: String,  enum: ['Male','Female','Other'], default: 'Other' },
  city:        { type: String,  trim: true },
  Insurance:     { type: String,  trim: true },
  therapy:     { type: String,  trim: true },
  therapyDate: { type: Date },
  createdAt:   { type: Date,    default: Date.now }
});

// (Optional) create an index on email for faster lookups
userSchema.index({ email: 1 });

export default mongoose.model('User', userSchema);
