const router = require('express').Router();
const { Album } = require('../../models');
const withAuth = require('../../utils/auth');

// The `/api/albums` endpoint

// Create new album
router.post('/', withAuth, async (req, res) => {
  try {
    const newAlbum = await Album.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newAlbum);

  } catch (err) {
    res.status(500).json({ error: err, message: 'Failed to create album.' });
  }
});

// Get all albums
router.get('/', async (req, res) => {
  try {
    const albumData = await Album.findAll({});
    res.status(200).json(albumData);

  } catch (err) {
    res.status(500).json({ error: err, message: 'Failed to retrieve all albums.' });
  }
});

// Delete album
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const albumData = await Album.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!albumData) {
      res.status(404).json({ message: 'Album not found.' });
      return;
    }

    res.status(200).json(albumData);
  } catch (err) {
    res.status(500).json({ error: err, message: 'Failed to delete album.' });
  }
});

// Update album
router.put('/:id', withAuth, async (req, res) => {
  try {
    const albumData = await Album.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!albumData) {
      res.status(404).json({ message: 'Album not found.' });
      return;
    }

    res.status(200).json(albumData);
    
  } catch (err) {
    res.status(500).json({ error: err, message: 'Failed to update album.' });
  }
});

module.exports = router;
