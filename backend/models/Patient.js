import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  fullName:    { type: String,  required: true, trim: true },
  phoneNumber: { type: String,  required: true, trim: true },
  email:       { type: String,  required: true, trim: true},
  dob:         { type: Date },
  gender:      { type: String },
  city:        { type: String,  trim: true },
  insurance:     { type: String,  trim: true },
  therapy:     { type: String,  trim: true },
  therapyDate: { type: Date },
  createdAt:   { type: Date,    default: Date.now }
});

patientSchema.index({ email: 1 });

export default mongoose.model('Patient', patientSchema);
