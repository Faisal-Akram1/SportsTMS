const express = require('express');
const router = express.Router();

const standingsController = require('../controllers/standingsController');

router.get('/:tournamentId', standingsController.getStandingsByTournament);
router.post('/', standingsController.createOrUpdateStanding);
router.delete('/:id', standingsController.deleteStanding);

module.exports = router;