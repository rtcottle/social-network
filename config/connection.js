const { connect, connection } = require('mongoose');

connect('mongodb://localhost/reactionThoughts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
