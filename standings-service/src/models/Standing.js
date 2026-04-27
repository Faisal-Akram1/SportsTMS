const mongoose = require('mongoose');

const standingSchema = new mongoose.Schema(
  {
    tournamentId: {
      type: String,
      required: true
    },
    teamId: {
      type: String,
      required: true
    },
    played: {
      type: Number,
      default: 0
    },
    won: {
      type: Number,
      default: 0
    },
    lost: {
      type: Number,
      default: 0
    },
    drawn: {
      type: Number,
      default: 0
    },
    points: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

standingSchema.index({ tournamentId: 1, teamId: 1 }, { unique: true });

module.exports = mongoose.model('Standing', standingSchema);