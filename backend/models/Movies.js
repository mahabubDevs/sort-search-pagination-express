// const mongoose = require('mongoose');

// const movieSchema = new mongoose.Schema({

//     name: {
//         type: String,
//         required: true
//     },
//     img: {
//         type: String,
//         required: true
//     },
//     year: {
//         type: Number,
//         required: true
//     },
//     genre: {
//         type: [String],
//         required: true
//     },
//     rating: {
//         type: Number,
//         required: true
//     },



// });

// module.exports = mongoose.model('Movies', movieSchema);



const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true, default: 0 },
  year: { type: Number, required: true, default: new Date().getFullYear() },
  img: { type: String, required: true, default: 'https://example.com/default.jpg' },
  genre: { type: [String], required: true, default: ['Unknown'] }
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
