const express = require('express');
const userRouter = require('./routers/user.router.js');
const postRouter = require('./routers/post.router.js');

const app = express();

app.use('/users', userRouter);
app.use('/posts', postRouter);

app.listen(3000);
