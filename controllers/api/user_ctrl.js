const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// The `/api/users` endpoint

// Create new user
// [POST] [/api/users/] with [JSON] [BODY]
// {
// 	"username": "",
//  "password": ""
// }

router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    // Automatically log in the user after registration
    req.session.save(() => {
      res.session.user_id = userData.user_id;
      res.session.logged_in = true;
      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in.' });
    });

    res.status(200).json({ user: userData, message: 'You are now logged in.' });
  } catch (err) {
    res.status(500).json({ error: err, message: 'Failed to sign up.' });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({});

    res.status(200).json(userData);
  } catch (err) {
    res
      .status(500)
      .json({ error: err, message: 'Failed to retrieve all users.' });
  }
});

// Get a user
router.get('/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { user_id: req.params.id },
    });

    res.status(200).json(userData);
  } catch (err) {
    res
      .status(500)
      .json({ error: err, message: 'Failed to retrieve all users.' });
  }
});

// Log in user

// [Get] [/api/users/login] with [JSON] [Body]
//
// [Body] should be like this
// {
// 	"username": "",
//  "password": ""
// }

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
      req.session.user_id = userData.user_id;
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
// [POST] [/api/users/logout] with [NO] [BODY]
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
