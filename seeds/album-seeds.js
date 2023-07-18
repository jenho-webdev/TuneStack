// Require User model.
const { Album } = require('../models');
// Data to be seeded by bulk creation.
const albumData = [
  {
    title: "Thriller",
    cloudinary_url: "https://example.com/thriller",
    extension_url: "https://example.com/thriller",
    artist: "Michael Jackson",
    year: "1982",
    genre: "Pop",
    description: "Thriller is the sixth studio album by American singer Michael Jackson",
  },
  {
    title: "Abbey Road",
    cloudinary_url: "https://example.com/abbey-road",
    extension_url: "https://example.com/abbey-road",
    artist: "The Beatles",
    year: "1969",
    genre: "Rock",
    description: "Abbey Road is the eleventh studio album by English rock band the Beatles",
  },
  {
    title: "The Dark Side of the Moon",
    cloudinary_url: "https://example.com/dark-side-of-the-moon",
    extension_url: "https://example.com/dark-side-of-the-moon",
    artist: "Pink Floyd",
    year: "1973",
    genre: "Progressive Rock",
    description: "The Dark Side of the Moon is the eighth studio album by English rock band Pink Floyd",
  },
  {
    title: "Back in Black",
    cloudinary_url: "https://example.com/back-in-black",
    extension_url: "https://example.com/back-in-black",
    artist: "AC/DC",
    year: "1980",
    genre: "Hard Rock",
    description: "Back in Black is the seventh studio album by Australian rock band AC/DC",
  },
  {
    title: "Hotel California",
    cloudinary_url: "https://example.com/hotel-california",
    extension_url: "https://example.com/hotel-california",
    artist: "Eagles",
    year: "1976",
    genre: "Rock",
    description: "Hotel California is the fifth studio album by American rock band Eagles",
  },
  {
    title: "Nevermind",
    cloudinary_url: "https://example.com/nevermind",
    extension_url: "https://example.com/nevermind",
    artist: "Nirvana",
    year: "1991",
    genre: "Grunge",
    description: "Nevermind is the second studio album by American rock band Nirvana",
  },
  {
    title: "The Joshua Tree",
    cloudinary_url: "https://example.com/joshua-tree",
    extension_url: "https://example.com/joshua-tree",
    artist: "U2",
    year: "1987",
    genre: "Rock",
    description: "The Joshua Tree is the fifth studio album by Irish rock band U2",
  },
  {
    title: "Rumours",
    cloudinary_url: "https://example.com/rumours",
    extension_url: "https://example.com/rumours",
    artist: "Fleetwood Mac",
    year: "1977",
    genre: "Rock",
    description: "Rumours is the eleventh studio album by British-American rock band Fleetwood Mac",
  },
  {
    title: "Born to Run",
    cloudinary_url: "https://example.com/born-to-run",
    extension_url: "https://example.com/born-to-run",
    artist: "Bruce Springsteen",
    year: "1975",
    genre: "Rock",
    description: "Born to Run is the third studio album by American singer-songwriter Bruce Springsteen",
  },
  {
    title: "Led Zeppelin IV",
    cloudinary_url: "https://example.com/led-zeppelin-iv",
    extension_url: "https://example.com/led-zeppelin-iv",
    artist: "Led Zeppelin",
    year: "1971",
    genre: "Rock",
    description: "Led Zeppelin IV is the fourth studio album by English rock band Led Zeppelin",
  },
];
// Function that will seed all data to schema at once.
const seedAlbums = () => Album.bulkCreate(albumData);
// Export function so that it can be used elsewhere.
module.exports = seedAlbums;