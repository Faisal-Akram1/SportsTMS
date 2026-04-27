const Standing = require('../models/Standing');

exports.getStandingsByTournament = async (req, res) => {
  try {
    const standings = await Standing.find({
      tournamentId: req.params.tournamentId
    }).sort({ points: -1, won: -1 });

    res.json({
      success: true,
      count: standings.length,
      standings
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: 'Server error',
      error: err.message
    });
  }
};

exports.createOrUpdateStanding = async (req, res) => {
  try {
    const {
      tournamentId,
      teamId,
      played,
      won,
      lost,
      drawn,
      points
    } = req.body;

    const standing = await Standing.findOneAndUpdate(
      {
        tournamentId,
        teamId
      },
      {
        played,
        won,
        lost,
        drawn,
        points
      },
      {
        new: true,
        upsert: true,
        runValidators: true
      }
    );

    res.json({
      success: true,
      msg: 'Standing saved successfully',
      standing
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: 'Server error',
      error: err.message
    });
  }
};

exports.deleteStanding = async (req, res) => {
  try {
    const standing = await Standing.findByIdAndDelete(req.params.id);

    if (!standing) {
      return res.status(404).json({
        success: false,
        msg: 'Standing not found'
      });
    }

    res.json({
      success: true,
      msg: 'Standing deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: 'Server error',
      error: err.message
    });
  }
};