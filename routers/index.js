const express = require('express');
const app = express();
const filmRouter = require('./routers/films.router');
const directorRouter = require('./routers/directors.router');

app.use('/films', filmRouter);
app.use('/directors', directorRouter);

app.listen(3000, () => {
	console.log('Server is started!');
});
