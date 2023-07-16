const router = require('express').Router();
const { User } = require('../../models');

// The `/api/users` endpoint

// Create new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    // Automatically log in the user after registration
    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        res.status(200).json({ user: userData, message: 'You are now logged in.' });
    });

  } catch (err) {
      res.status(500).json({ error: err, message: 'Failed to create new user.' });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({});

    res.status(200).json(userData);

  } catch (err) {
    res.status(500).json({ error: err, message: 'Failed to retrieve all users.' });
  }
});

// Log in user
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username, please try again.' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {

      res
        .status(400)
        .json({ message: 'Incorrect password, please try again.' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(500).json({ error: err, message: 'Failed to login user.' });
  }
});

// Log out user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(200).json({ message: 'You are now logged out.' });
    });

  } else {
    res.status(404).end('Session not found.');
  }
});

module.exports = router;
