const Therapist = require('../models/Therapist');

// @desc    Get all therapists
// @route   GET /api/therapists
// @access  Public
const getTherapists = async (req, res) => {
  try {
    const { search, specialty } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { specialty: { $regex: search, $options: 'i' } }
      ];
    }

    if (specialty && specialty !== 'All') {
      query.specialty = specialty;
    }

    const therapists = await Therapist.find(query);
    res.status(200).json(therapists);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create dummy therapist (for seeding/admin)
// @route   POST /api/therapists
// @access  Public
const createTherapist = async (req, res) => {
  try {
    const therapist = await Therapist.create(req.body);
    res.status(201).json(therapist);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getTherapists,
  createTherapist,
};
