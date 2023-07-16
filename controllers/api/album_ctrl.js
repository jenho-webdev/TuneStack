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
//router.post('/', withAuth, async (req, res) => {
router.post('/', async (req, res) => {
  try {
    const newAlbum = await Album.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newAlbum);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Delete a album
// router.delete('/:id', withAuth, async (req, res) => {
router.delete('/:id', async (req, res) => {
  try {
    const albumData = await Album.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id,
      },
    });

    if (!albumData) {
      res.status(404).json({ message: 'No album found with this id!' });
      return;
    }

    res.status(200).json(albumData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
