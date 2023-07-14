const router = require('express').Router();
const { Album, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all albums and JOIN with user data
    const albumData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
