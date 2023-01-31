const { Schema, default: mongoose } = require('mongoose');
const dayjs = require('dayjs');

const reactionSchema = new Schema({
  reactionId: mongoose.ObjectId,
  reactionBody: {
    type: String,
    required: true,
    max: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    Date: dayjs.format(),
  },
});

module.exports = reactionSchema;
