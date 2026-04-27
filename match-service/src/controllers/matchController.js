const Match = require('../models/Match');

exports.scheduleMatch = async (req, res) => {
  try {
    const { tournamentId, teamAId, teamBId, date, venue } = req.body;

    const match = new Match({
      tournamentId,
      teamAId,
      teamBId,
      date,
      venue
    });

    await match.save();

    res.status(201).json({
      success: true,
      msg: 'Match scheduled successfully',
      match
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: 'Server error',
      error: err.message
    });
  }
};

exports.getMatches = async (req, res) => {
  try {
    const matches = await Match.find().sort({ date: 1 });

    res.json({
      success: true,
      count: matches.length,
      matches
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: 'Server error',
      error: err.message
    });
  }
};

exports.getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);

    if (!match) {
      return res.status(404).json({
        success: false,
        msg: 'Match not found'
      });
    }

    res.json({
      success: true,
      match
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: 'Server error',
      error: err.message
    });
  }
};

exports.getMatchesByTournament = async (req, res) => {
  try {
    const matches = await Match.find({
      tournamentId: req.params.tournamentId
    }).sort({ date: 1 });

    res.json({
      success: true,
      count: matches.length,
      matches
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: 'Server error',
      error: err.message
    });
  }
};

exports.recordResult = async (req, res) => {
  try {
    const { teamAScore, teamBScore } = req.body;

    const match = await Match.findById(req.params.id);

    if (!match) {
      return res.status(404).json({
        success: false,
        msg: 'Match not found'
      });
    }

    let winnerTeamId = null;
    let isDraw = false;

    if (teamAScore > teamBScore) {
      winnerTeamId = match.teamAId;
    } else if (teamBScore > teamAScore) {
      winnerTeamId = match.teamBId;
    } else {
      isDraw = true;
    }

    match.result = {
      teamAScore,
      teamBScore,
      winnerTeamId,
      isDraw
    };

    match.status = 'COMPLETED';

    await match.save();

    res.json({
      success: true,
      msg: 'Match result recorded successfully',
      match
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: 'Server error',
      error: err.message
    });
  }
};

exports.deleteMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);

    if (!match) {
      return res.status(404).json({
        success: false,
        msg: 'Match not found'
      });
    }

    res.json({
      success: true,
      msg: 'Match deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: 'Server error',
      error: err.message
    });
  }
};