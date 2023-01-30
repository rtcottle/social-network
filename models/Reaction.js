const { Schema, default: mongoose } = require('mongoose');

const reactionSchema = new Schema(
  {
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
    createdAt: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

module.exports = reactionSchema;
