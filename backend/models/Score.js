const mongoose = require('mongoose');

const ballSchema = new mongoose.Schema({
  result: String,
  runs: Number,
  runs_to: String,
});

const overSchema = new mongoose.Schema({
  over_number: Number,
  balls: [ballSchema],
});

const scoreSchema = new mongoose.Schema({
  match_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
  balls_per_over: { type: Number, required: true },
  overs: [overSchema],
});

module.exports = mongoose.model('Score', scoreSchema);
