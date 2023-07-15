const router = require('express').Router();
const { User } = require('../../models');

// The `/api/users` endpoint

//create new user s
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    console.log(userData);

    if (!userData) {
      res.status(400).json({ message: 'Incorrect username, please try again' });
      return;
    } else {
      res.json({ message: 'correct username' });
    }

    const validPassword = await userData.checkPassword(req.body.password);
    console.log(`validpassword: ${validPassword}`);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password, please try again' });

      return;
    } else {
      res.json({ message: 'correct password' });
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
