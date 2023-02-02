const { Schema, default: mongoose } = require('mongoose');
const dayjs = require('dayjs');

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
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

reactionSchema.virtual('getDate').get(function () {
  const date = this.createdAt;
  const dayjsDate = dayjs(date);
  return dayjsDate.format('DD/MM/YYYY');
});

module.exports = reactionSchema;
