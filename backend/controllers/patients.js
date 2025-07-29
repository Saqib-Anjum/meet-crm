import Patient from '../models/Patient.js';


export const getPatient = async (req, res) => {
  try {
    const users = await Patient.find().lean();
    return res.status(200).json({
      message: 'Users fetched successfully',
      users
    });
  } catch (err) {
    console.error('getUsers error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};


export const createPatient = async (req, res) => {
  try {
    const {
      fullName,
      phoneNumber,
      email,
      dob,
      gender,
      city,
      insurance,
      therapy,
      therapyDate
    } = req.body;

    // 1) Validate required fields
    if (!fullName || !phoneNumber || !email) {
      return res.status(400).json({ message: 'fullName, phoneNumber and email are required' });
    }

    // 2) Build payload
    const payload = {
      fullName,
      phoneNumber,
      email,
      dob:         dob ? new Date(dob) : undefined,
      gender,
      city,
      insurance,
      therapy,
      therapyDate: therapyDate ? new Date(therapyDate) : undefined
    };

    // 3) Persist
    const user = new Patient(payload);
    await user.save();

    return res.status(201).json({
      message: 'User created successfully',
      user
    });
  } catch (err) {
    console.error('createUser error:', err);

    // Duplicate‐key (e.g. email) error
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};


export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      fullName,
      phoneNumber,
      email,
      dob,
      gender,
      city,
      insurance,
      therapy,
      therapyDate
    } = req.body;

    // 1) Validate required fields
    if (!fullName || !phoneNumber || !email) {
      return res.status(400).json({ message: 'fullName, phoneNumber and email are required' });
    }

    // 2) Build payload
    const payload = {
      fullName,
      phoneNumber,
      email,
      dob:         dob ? new Date(dob) : undefined,
      gender,
      city,
      insurance,
      therapy,
      therapyDate: therapyDate ? new Date(therapyDate) : undefined
    };

    // 3) Attempt update
    const updated = await Patient.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
      context: 'query'
    }).lean();

    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'User updated successfully',
      user: updated
    });
  } catch (err) {
    console.error('updateUser error:', err);

    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};


export const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Patient.findByIdAndDelete(id).lean();

    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('deleteUser error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
