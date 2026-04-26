const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Match Service API is working'
  });
});

module.exports = router;
