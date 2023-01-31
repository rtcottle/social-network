const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: [
      //TODO: is this and reactions being referrenced correctly?
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'reactionSchema',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('getDate').get(function () {
  const date = this.createdAt;
  const dayjsDate = dayjs(date);
  return dayjsDate.format('DD/MM/YYYY');
});

// Creates a virtual property `reactionCount` that gets the amount of reactions per user
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
