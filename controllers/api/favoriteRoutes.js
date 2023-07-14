const router = require('express').Router();
const { Favorite, User, Album } = require('../../models');

// The `/api/favorites` endpoint

router.get('/', async (req, res) => {
  try {
    Favorite.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
  } catch (err) {}
});

//get just one favor
router.get('/:id', async (req, res) => {
  try {
    const favorite = await Favorite.findOne({
      where: {
        id: req.params.id,
      },

  })
 } catch (err) {}
});

//create a new favor
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      album_id: "1",
    }
  */
  try {
const newFavor = await Favorite.create({
      ...req.body,    
      user_id: req.session.user_id,
    });

    res.status(200).json(newArticle);
  } catch (err) {
    res.status(400).json(err);

}
});


router.delete('/:id', async (req, res) => {
  try {
    const favoriteData = await Favorite.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!favoriteData) {
      res.status(404).json({ message: 'Favor not found' });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
