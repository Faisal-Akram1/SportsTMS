const express = require('express');
const router = express.Router();

const teamController = require('../controllers/teamController');

router.post('/', teamController.createTeam);
router.get('/', teamController.getTeams);
router.get('/tournament/:tournamentId', teamController.getTeamsByTournament);
router.get('/:id', teamController.getTeamById);
router.post('/:id/players', teamController.addPlayerToTeam);
router.delete('/:id', teamController.deleteTeam);

module.exports = router;