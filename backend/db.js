// db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = "mongodb+srv://stas:St9937d000@developer.katga7s.mongodb.net/?retryWrites=true&w=majority&appName=developer";
const DB_NAME = "meet_crm";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB (Mongoose) connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};
