const express = require('express');
const router = express.Router();
const { chatWithCompanion, analyzeJournal } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/chat', protect, chatWithCompanion);
router.post('/analyze/:id', protect, analyzeJournal);

module.exports = router;
