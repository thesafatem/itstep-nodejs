const express = require('express');
const Sequelize = require('sequelize');

const app = express();

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

// select * from films
// join directors
// on films.directorId = directors.id

Film.belongsTo(Director, { foreignKey: 'directorId' });
Director.hasMany(Film, { foreignKey: 'directorId' });

sequelize.sync().then((result) => {
	console.log('DB is connected!');
});

app.use(express.json());

// https://learn.javascript.ru/destructuring-assignment

app.post('/films', async (req, res) => {
	const { title, year, directorId } = req.body;
	let film = await Film.create({
		title,
		year,
		directorId,
	});

	res.json(film);
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
	const films = await Film.findAll({
		include: [
			{
				model: Director,
			},
		],
	});
	return res.json(films);
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
	res.status(200).json({
		directors,
	});
});

app.listen(3000, () => {
	console.log('Server is started!');
});
