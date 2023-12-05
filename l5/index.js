const express = require('express');
const hbs = require('hbs');
const app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

const films = [
	{
		name: 'Gentlemen',
		director: 'Guy Ritchie',
		year: 2018,
		actors: ['Matthew McCoughnahey'],
	},
	{
		name: 'Dead poets society',
		director: 'Peter Wir',
		year: 1989,
		actors: ['Robin Williams', 'Ethan Hawk'],
	},
];

app.get('/', (req, res) => {
	res.render('hello.hbs', {
		students: ['Amir', 'Roman', 'Polina'],
	});
});

app.get('/films', (req, res) => {
	res.render('films.hbs', {
		films: films,
	});
});

app.get('/films/:id', (req, res) => {
	const id = req.params.id;
	res.render('film.hbs', {
		film: films[id],
	});
});

app.listen(3000);
