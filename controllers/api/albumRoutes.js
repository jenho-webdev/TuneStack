const router = require('express').Router();
const { Album } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
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

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const albumData = await Album.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
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
