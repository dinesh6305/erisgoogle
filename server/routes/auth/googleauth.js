const express = require('express');
const passport = require('passport');
const { googleAuthSuccess, googleAuthFailure } = require('../../controllers/auth/auuth-controller');
const router = express.Router();

router.get('/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/api/auth/google/failure' }),
  googleAuthSuccess
);

router.get('/google/failure', googleAuthFailure);

module.exports = router;