const router = require('express').Router();
const { Favorite, User, Album } = require('../../models');

// The `/api/favorites` endpoint

// Get all user's favorites
router.get('/', async (req, res) => {
  try {
    const favorData = Favorite.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    res.status(200).json(favorData);
  } catch (err) {
    res
      .status(500)
      .json({ error: err, message: 'Failed to retrieve all favorites.' });
  }
});

// Get one user's favorite by id
router.get('/:id', async (req, res) => {
  try {
    const favorData = await Favorite.findOne({
      where: {
        user_id: req.session.user_id,
        id: req.params.id,
      },
    });
    res.status(200).json(favorData);
  } catch (err) {
    res.status(500).json({
      error: err,
      message: `Failed to retrieve ${username}'s favorite #${req.params.id}`,
    });
  }
});

// Create new favorite
router.post('/', async (req, res) => {
  /* req.body should look like this...
      {
        album_id: "1",
      }
    */
  try {
    const newFavor = await Favorite.create({
      album_id: req.session.album_id,
      user_id: req.session.user_id,
    });

    res.status(200).json(newFavor);
  } catch (err) {
    res.status(500).json({
      error: err,
      message: `Failed to create new favorite`,
    });
  }
});

// Update user favorite
router.delete('/:id', async (req, res) => {
  try {
    const favorData = await Favorite.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!favorData) {
      res.status(404).json({ message: 'Favor not found and failed to delete' });
      return;
    }
  } catch (err) {
    res.status(500).json({
      error: err,
      message: `Failed to delete favorite # ${req.params.id}`,
    });
  }
});

module.exports = router;
