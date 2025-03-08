// const router = require('express').Router();
// const Movies = require('../models/Movies');
// const movieData = require('../config/MoviesJson');

// router.get('/movies', async (req, res) => {
//     try {
//         const page = parseInt(req.query.page) - 1 || 0;
//         const limit = parseInt(req.query.limit) || 5;
//         const search = req.query.search || '';
//         let sort = req.query.sort || 'rating';
//         let genre = req.query.genre || 'All';

//         const genreOption = [
//             'All',
//             'Action',
//             'Adventure',
//             'Comedy',
//             'Crime',
//             'Drama',
//             'Fantasy',
//             'Historical',
//             'Horror',
//             'Mystery',
//             'Romance',
//             'Science Fiction',
//             'Thriller',
//             'Western',
//         ];

//         genre === 'All'
//             ? (genre = [...genreOption])
//             : (genre = req.query.genre.split(','));
//         req.query.sort ? (sort = req.query.sort.split(',')) : (sort = [sort]);

//         let sortBy = {};
//         if (sort[1]) {
//             sortBy[sort[0]] = sort[1];
//         }else{
//             sortBy[sort[0]] = 'asc';
//         }

//         const movies = await Movies.find({
//             name: { $regex: search, $options: 'i' },
//             genre: { $in: genre },
//         })
//             .where('genre')
//             .in([...genre])
//             .skip(page * limit)
//             .limit(limit)
//             .sort(sortBy);
//         const totalMovies = await Movies.countDocuments({
//             name: { $regex: search, $options: 'i' },
//             genre: { $in: genre },
//         });
//         res.status(200).json({
//             error: false,
//             movies,
//             totalMovies,
//             genre: genreOption,
//             page: page + 1,
//             limit,
//         });
        
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// router.get('/data', async (req, res) => {
//     try {
//         res.status(200).json({ message: "api work" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// const insertMovies = async () => {
//     try {
//         console.log("Movie data type:", typeof movieData); // Should be object or array
//         console.log("Is array:", Array.isArray(movieData)); // Should be true
//         console.log("Movie data before inserting:", movieData); // Check if empty

//         if (!Array.isArray(movieData) || movieData.length === 0) {
//             console.log("Error: No valid movie data found!");
//             return;
//         }
//         await Movies.insertMany(movieData);
//         console.log("Movies inserted successfully");
//     } catch (error) {
//         console.log("Error inserting movies:", error.message);
//     }
// };



// insertMovies().then(() => console.log('Movies inserted')).catch((error) => console.log(error));

// module.exports = router;



const router = require("express").Router();
const Movie = require("../models/Movies");
const movies = require("../config/Moves.json");

router.get("/movies", async (req, res) => {
	try {
		const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 5;
		const search = req.query.search || "";
		let sort = req.query.sort || "rating";
		let genre = req.query.genre || "All";

		const genreOptions = [
			"Action",
			"Romance",
			"Fantasy",
			"Drama",
			"Crime",
			"Adventure",
			"Thriller",
			"Sci-fi",
			"Music",
			"Family",
		];

		genre === "All"
			? (genre = [...genreOptions])
			: (genre = req.query.genre.split(","));
		req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

		let sortBy = {};
		if (sort[1]) {
			sortBy[sort[0]] = sort[1];
		} else {
			sortBy[sort[0]] = "asc";
		}

		const movies = await Movie.find({ name: { $regex: search, $options: "i" } })
			.where("genre")
			.in([...genre])
			.sort(sortBy)
			.skip(page * limit)
			.limit(limit);

		const total = await Movie.countDocuments({
			genre: { $in: [...genre] },
			name: { $regex: search, $options: "i" },
		});

		const response = {
			error: false,
			total,
			page: page + 1,
			limit,
			genres: genreOptions,
			movies,
		};

		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true, message: "Internal Server Error" });
	}
});

// const insertMovies = async () => {
//     try {
//         const docs = await Movie.insertMany(movies);
//         return Promise.resolve(docs);
//     } catch (err) {
//         return Promise.reject(err)
//     }
// };

// insertMovies()
//     .then((docs) => console.log(docs))
//     .catch((err) => console.log(err))

module.exports = router;