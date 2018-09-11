const express = require('express');
const router = express.Router();

// @route Get api/profile/test
// @desc Tests profile route
// @access Public
router.get('', (req, res) => res.json({ msg: 'profile router is work' }));

module.exports = router;
