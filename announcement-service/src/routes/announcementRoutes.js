const express = require('express');
const router = express.Router();

const announcementController = require('../controllers/announcementController');

router.post('/', announcementController.createAnnouncement);
router.get('/', announcementController.getAnnouncements);
router.get('/tournament/:tournamentId', announcementController.getAnnouncementsByTournament);
router.get('/:id', announcementController.getAnnouncementById);
router.delete('/:id', announcementController.deleteAnnouncement);

module.exports = router;