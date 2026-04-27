const express = require('express');
const router = express.Router();

const matchController = require('../controllers/matchController');

router.post('/', matchController.scheduleMatch);
router.get('/', matchController.getMatches);
router.get('/tournament/:tournamentId', matchController.getMatchesByTournament);
router.get('/:id', matchController.getMatchById);
router.put('/:id/result', matchController.recordResult);
router.delete('/:id', matchController.deleteMatch);

module.exports = router;