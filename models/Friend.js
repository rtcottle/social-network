const { Schema, model } = require('mongoose');

// Schema to create User model
const friendSchema = new Schema(
  {
    first: String,
    last: String,
    age: Number,
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
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

// Create a virtual property `fullName` that gets and sets the friend's full name
friendSchema
  .virtual('fullName')
  // Getter
  .get(function () {
    return `${this.first} ${this.last}`;
  })
  // Setter to set the first and last name
  .set(function (v) {
    const first = v.split(' ')[0];
    const last = v.split(' ')[1];
    this.set({ first, last });
  });

// Initialize our Friend model
const Friend = model('friends', friendSchema);

module.exports = Friend;
