const router = require('express').Router();
const { Favorite } = require('../../models');
const withAuth = require('../../utils/auth');

// The `/api/favorites` endpoint

// Get all current user's favorites
router.get('/', withAuth, async (req, res) => {
  try {
    const favorData = await Favorite.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const favors = favorData.map((favor) => favor.get({ plain: true }));

    if (!favorData) {
      res
        .status(404)
        .json({ message: 'Favors not found', session: req.session });
      return;
    }

    res.status(200).json(favors);
  } catch (err) {
    res.status(500).json({
      error: err,
      message: 'Failed to retrieve all favorites.',
    });
  }
});

// Get one current user's favorite by id
router.get('/:id', withAuth, async (req, res) => {
  try {
    const favorData = await Favorite.findOne({
      where: {
        user_id: req.session.user_id,
        id: req.params.id,
      },
    });
    if (!favorData) {
      res.status(404).json({ message: 'Favor not found' });
      return;
    }
    res
      .status(200)
      .json({ favorData: favorData, message: `User's favors found.` });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: `Failed to retrieve ${username}'s favorite #${req.params.id}`,
    });
  }
});

// Update user favorite (Add/Delete favorite) by albumID

router.post('/:id', withAuth, async (req, res) => {
  try {
    const albumId = req.params.id;
    const userId = req.session.user_id;

    // Check if the album is already favorited by the user
    const existingFavor = await Favorite.findOne({
      where: {
        user_id: userId,
        album_id: albumId,
      },
    });

    if (existingFavor) {
      // If the album is already favorited, delete it from favorites
      await existingFavor.destroy();

      return res.status(200).json({
        message: `Album ${albumId} has been removed from your favorites.`,
      });
    }

    // If the album is not favorited, create a new favorite
    const newFavor = await Favorite.create({
      album_id: albumId,
      user_id: userId,
    });

    res.status(200).json({
      newFavorData: newFavor,
      message: `Album ${albumId} has been added to your favorites.`,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: `Failed to update favorites for user ${userId}.`,
    });
  }
});

// Delete current user favorite by favorite's ID on
router.delete('/:id', withAuth, async (req, res) => {
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

    res.status(200).json({ message: 'Favor found and deleted' });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: `Failed to delete favorite # ${req.params.id}`,
    });
  }
});

module.exports = router;
