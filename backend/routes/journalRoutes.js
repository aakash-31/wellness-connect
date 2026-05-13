const express = require('express');
const router = express.Router();
const { getJournals, createJournal, deleteJournal } = require('../controllers/journalController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getJournals).post(protect, createJournal);
router.route('/:id').delete(protect, deleteJournal);

module.exports = router;
