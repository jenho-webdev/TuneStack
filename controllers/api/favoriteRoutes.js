const router = require('express').Router();
const { Favorite, User, Album } = require('../../models');

router.get('/', async (req, res) => {
  try {
    Favorite.findAll({
      include: [
        {
          model: Album,
        },
      ],
    });
  } catch (err) {}
});

router.get('/:id', (req, res) => {
  try {
  } catch (err) {}
});

router.post('/', (req, res) => {
  try {
  } catch (err) {}
});

router.delete('/:id', async (req, res) => {
  try {
  } catch (err) {}
});

module.exports = router;
