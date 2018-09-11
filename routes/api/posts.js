const express = require('express');
const router = express.Router();

// @route Get api/posts/test
// @desc Tests posts route
// @access Public
router.get('', (req, res) => res.json({ msg: 'posts router is work' }));

module.exports = router;
