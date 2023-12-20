const express = require('express');
const Sequelize = require('sequelize');
const hbs = require('hbs');

const app = express();

app.set('view engine', 'hbs');

app.use(express.static('public'));

const sequelize = new Sequelize({
	storage: 'l9.db',
	dialect: 'sqlite',
});

const Film = sequelize.define('film', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	title: {
		type: Sequelize.STRING(200),
	},
	year: {
		type: Sequelize.INTEGER,
	},
	directorId: {
		type: Sequelize.INTEGER,
	},
});

const Director = sequelize.define('director', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: Sequelize.STRING(200),
	},
});

const Actor = sequelize.define('actor', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: Sequelize.STRING(200),
	},
});

const FilmActor = sequelize.define('film_actor', {
	filmId: {
		type: Sequelize.INTEGER,
	},
	actorId: {
		type: Sequelize.INTEGER,
	},
});

// filmId = 2
// actors = [1, 3]
// filmId | actorId
//   2         1
//   2         3

// select actors.name, films.name from actors
// join film_actors
// on actors.id = film_actors.actorId
// join films
// on films.id = film_actors.filmId

// Actor.findAll({
// 	include: [
// 		{
// 			model: FilmActor,
// 			include: [
// 				{
// 					model: Film,
// 				},
// 			],
// 		},
// 	],
// });

// select * from films
// join directors
// on films.directorId = directors.id

Film.belongsTo(Director, { foreignKey: 'directorId' });
Director.hasMany(Film, { foreignKey: 'directorId' });
Actor.hasMany(FilmActor, { foreignKey: 'actorId' });
FilmActor.belongsTo(Film, { foreignKey: 'filmId' });

sequelize.sync().then((result) => {
	console.log('DB is connected!');
});

app.use(express.json());

// https://learn.javascript.ru/destructuring-assignment

app.post('/films', async (req, res) => {
	const { title, year, directorId, actors } = req.body;
	const film = await Film.create({
		title,
		year,
		directorId,
	});

	for (let actor of actors) {
		await FilmActor.create({
			filmId: film.id,
			actorId: actor,
		});
	}

	return res.status(201).json(film);
});

app.get('/films', async (req, res) => {
	// const name = req.query.name;
	// const films = await Film.findAll({
	// 	where: {
	// 		title: {
	// 			[Sequelize.Op.like]: `%${name}%`,
	// 		},
	// 	},
	// });
	// select * from films
	// where title like '%Titan%'

	// const year = req.query.year;
	// const films = await Film.findAll({
	// 	where: {
	// 		year: year,
	// 	},
	// });

	// select * from films
	// join directors
	// on films.directorId = directors.id

	const films = await Film.findAll({
		include: [
			{
				model: Director,
			},
		],
	});
	// return res.json(films);
	return res.render('films.hbs', {
		films,
	});
});

app.get('/films/:id', async (req, res) => {
	// const { id } = req.params;
	const id = req.params.id;
	const film = await Film.findByPk(id);
	// select * from films
	// where id = ${id}
	if (film) {
		return res.json(film);
	}
	res.statusCode = 404;
	res.json({
		error: 'no such film',
	}).end();
});

app.delete('/films/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const film = await Film.findByPk(id);
		if (!film) {
			return res.status(404).json({
				status: 404,
				message: 'Film not found',
			});
		}
		await film.destroy();
		return res.status(200).json({
			message: 'ok',
		});
	} catch (e) {
		return res.status(400).json({
			message: e.message,
		});
	}
});

app.put('/films/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const film = await Film.findByPk(id);
		if (!film) {
			return res.status(404).json({
				status: 404,
				message: 'Film not found',
			});
		}
		const { title, year } = req.body;
		await film.update({
			title,
			year,
		});
		return res.status(200).json(film);
	} catch (e) {
		return res.status(400).json({
			message: e.message,
		});
	}
});

app.post('/directors', async (req, res) => {
	const { name } = req.body;
	const director = await Director.create({ name });
	res.status(201).json({
		director,
	});
});

app.get('/directors', async (req, res) => {
	const directors = await Director.findAll({
		include: [
			{
				model: Film,
			},
		],
	});
	// res.status(200).json(directors);
	return res.render('directors.hbs', {
		directors,
	});
});

app.delete('/directors/:id', async (req, res) => {
	const id = req.params.id; // id = 2
	// delete from films
	// where directorId = 2
	await Film.destroy({
		where: {
			directorId: id,
		},
	});
	await Director.destroy({
		where: {
			id,
		},
	});
	return res.status(200).json({
		message: 'ok',
	});
});

app.post('/actors', async (req, res) => {
	const name = req.body.name;
	const actor = await Actor.create({ name });
	return res.status(201).json({
		actor,
	});
});

app.get('/actors', async (req, res) => {
	const actors = await Actor.findAll({
		include: [
			{
				model: FilmActor,
				include: [
					{
						model: Film,
					},
				],
			},
		],
	});

	return res.status(200).json({
		actors,
	});
});

app.listen(3000, () => {
	console.log('Server is started!');
});
