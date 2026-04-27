const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
      trim: true
    },
    captainId: {
      type: String,
      required: true
    },
    players: [
      {
        playerId: {
          type: String,
          required: true
        },
        username: {
          type: String
        },
        email: {
          type: String
        }
      }
    ],
    tournamentId: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Team', teamSchema);