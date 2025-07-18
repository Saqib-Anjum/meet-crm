// controllers/users.js
import User from '../models/User.js';

// GET /users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().lean();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// POST /users
export const createUser = async (req, res) => {
  try {
    const payload = {
      fullName:    req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      email:       req.body.email,
      dob:         req.body.dob ? new Date(req.body.dob) : undefined,
      gender:      req.body.gender,
      city:        req.body.city,
      country:     req.body.country,
      therapy:     req.body.therapy,
      therapyDate: req.body.therapyDate ? new Date(req.body.therapyDate) : undefined
    };

    const user = new User(payload);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    // handle duplicate email error
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Failed to create user' });
  }
};
