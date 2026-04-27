const Announcement = require('../models/Announcement');

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, content, authorId, tournamentId } = req.body;

    const announcement = new Announcement({
      title,
      content,
      authorId,
      tournamentId
    });

    await announcement.save();

    res.status(201).json({
      success: true,
      msg: 'Announcement created successfully',
      announcement
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: 'Server error',
      error: err.message
    });
  }
};

exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: announcements.length,
      announcements
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: 'Server error',
      error: err.message
    });
  }
};

exports.getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        msg: 'Announcement not found'
      });
    }

    res.json({
      success: true,
      announcement
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: 'Server error',
      error: err.message
    });
  }
};

exports.getAnnouncementsByTournament = async (req, res) => {
  try {
    const announcements = await Announcement.find({
      tournamentId: req.params.tournamentId
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: announcements.length,
      announcements
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: 'Server error',
      error: err.message
    });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        msg: 'Announcement not found'
      });
    }

    res.json({
      success: true,
      msg: 'Announcement deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: 'Server error',
      error: err.message
    });
  }
};