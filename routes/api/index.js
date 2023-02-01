const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const reactionRoutes = require('./reactionRoutes');
const userRoutes = require('./userRoutes');

router.use('/thoughts', thoughtRoutes);
router.use('/thoughts/:thoughtId', reactionRoutes);
router.use('/users', userRoutes);

module.exports = router;
