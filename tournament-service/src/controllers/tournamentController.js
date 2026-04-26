
const Tournament = require('../models/Tournament');

exports.createTournament = async (req, res) => {
  try {
    const { name, description, startDate, endDate, sportType, organizerId } = req.body;

    const tournament = new Tournament({
      name,
      description,
      startDate,
      endDate,
      sportType,
      organizerId
    });

    await tournament.save();

    res.status(201).json({
      success: true,
      msg: 'Tournament created successfully',
      tournament
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: 'Server error',
      error: err.message
    });
  }
};

exports.getTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: tournaments.length,
      tournaments
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: 'Server error',
      error: err.message
    });
  }
};

exports.getTournamentById = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament) {
      return res.status(404).json({
        success: false,
        msg: 'Tournament not found'
      });
    }

    res.json({
      success: true,
      tournament
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: 'Server error',
      error: err.message
    });
  }
};

exports.updateTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!tournament) {
      return res.status(404).json({
        success: false,
        msg: 'Tournament not found'
      });
    }

    res.json({
      success: true,
      msg: 'Tournament updated successfully',
      tournament
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: 'Server error',
      error: err.message
    });
  }
};

exports.deleteTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndDelete(req.params.id);

    if (!tournament) {
      return res.status(404).json({
        success: false,
        msg: 'Tournament not found'
      });
    }

    res.json({
      success: true,
      msg: 'Tournament deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: 'Server error',
      error: err.message
    });
  }
};