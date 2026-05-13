const Journal = require('../models/Journal');

// @desc    Get user journals
// @route   GET /api/journals
// @access  Private
const getJournals = async (req, res) => {
  try {
    const journals = await Journal.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(journals);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create journal entry
// @route   POST /api/journals
// @access  Private
const createJournal = async (req, res) => {
  try {
    if (!req.body.title || !req.body.content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const journal = await Journal.create({
      user: req.user._id,
      title: req.body.title,
      content: req.body.content,
      mood: req.body.mood || 'Neutral',
    });

    res.status(201).json(journal);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete journal entry
// @route   DELETE /api/journals/:id
// @access  Private
const deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);

    if (!journal) {
      return res.status(404).json({ message: 'Journal not found' });
    }

    // Check for user ownership
    if (journal.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await journal.deleteOne();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getJournals,
  createJournal,
  deleteJournal,
};
