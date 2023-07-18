const router = require('express').Router();
const { Album } = require('../../models');
const withAuth = require('../../utils/auth');

// The `/api/albums` endpoint

//Get ALL albums
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const albumData = await Album.findAll();
    // Serialize data so the template can read it
    const albums = albumData.map((album) => album.get({ plain: true }));

    res.status(200).json(albums);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Create new album

// [POST] [/api/Albums/] with [JSON][BODY]
// BODY should look like this
// {
//   "title": "",
//   "cloudinary_url:": "",
//  "ext_url": "",
//   "artist": "",
//   "year": "",
//    "description":"",
//    "genre": ""
// }

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
    res
      .status(500)
      .json({ error: err, message: 'Failed to retrieve all albums.' });
  }
});

//Get user created album records
router.get('/myAlbums', withAuth, async (req, res) => {
  try {
    const albumData = await Album.findAll({
      where: {
        creator_id: req.session.user_id,
      },
    });

    if (!albumData) {
      res.status(404).json({ message: 'Album(s) not found.' });
      return;
    }

    res.status(200).json(albumData);
  } catch (err) {
    res
      .status(500)
      .json({ error: err, message: 'Failed to retrieve user created albums.' });
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
