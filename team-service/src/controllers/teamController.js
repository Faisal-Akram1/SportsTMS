const Team = require('../models/Team');

exports.createTeam = async (req, res) => {
  try {
    const { teamName, captainId, players, tournamentId } = req.body;

    const team = new Team({
      teamName,
      captainId,
      players: players || [],
      tournamentId
    });

    await team.save();

    res.status(201).json({
      success: true,
      msg: 'Team registered successfully',
      team
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: 'Server error',
      error: err.message
    });
  }
};

exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: teams.length,
      teams
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: 'Server error',
      error: err.message
    });
  }
};

exports.getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        success: false,
        msg: 'Team not found'
      });
    }

    res.json({
      success: true,
      team
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: 'Server error',
      error: err.message
    });
  }
};

exports.getTeamsByTournament = async (req, res) => {
  try {
    const teams = await Team.find({
      tournamentId: req.params.tournamentId
    });

    res.json({
      success: true,
      count: teams.length,
      teams
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: 'Server error',
      error: err.message
    });
  }
};

exports.addPlayerToTeam = async (req, res) => {
  try {
    const { playerId, username, email } = req.body;

    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        success: false,
        msg: 'Team not found'
      });
    }

    const alreadyExists = team.players.some(
      player => player.playerId === playerId
    );

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        msg: 'Player already exists in this team'
      });
    }

    team.players.push({
      playerId,
      username,
      email
    });

    await team.save();

    res.json({
      success: true,
      msg: 'Player added successfully',
      team
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: 'Server error',
      error: err.message
    });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);

    if (!team) {
      return res.status(404).json({
        success: false,
        msg: 'Team not found'
      });
    }

    res.json({
      success: true,
      msg: 'Team deleted successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: 'Server error',
      error: err.message
    });
  }
};