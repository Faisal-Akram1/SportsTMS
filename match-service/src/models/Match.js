const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema(
  {
    tournamentId: {
      type: String,
      required: true
    },
    teamAId: {
      type: String,
      required: true
    },
    teamBId: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    venue: {
      type: String,
      required: true,
      trim: true
    },
    result: {
      teamAScore: {
        type: Number,
        default: null
      },
      teamBScore: {
        type: Number,
        default: null
      },
      winnerTeamId: {
        type: String,
        default: null
      },
      isDraw: {
        type: Boolean,
        default: false
      }
    },
    status: {
      type: String,
      enum: ['SCHEDULED', 'COMPLETED', 'CANCELLED'],
      default: 'SCHEDULED'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Match', matchSchema);