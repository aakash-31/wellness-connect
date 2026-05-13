const express = require('express');
const router = express.Router();
const { getTherapists, createTherapist } = require('../controllers/therapistController');

router.route('/').get(getTherapists).post(createTherapist);

module.exports = router;
