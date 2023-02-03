const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs');

const reactionSchema = new Schema(
  {
    reactionId: { type: Types.ObjectId, default: () => Types.ObjectId() },
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
      get: (ts) => {
        const dayjsDate = dayjs(ts);
        return dayjsDate.format('DD/MM/YYYY');
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
