const express = require('express');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})

app.use('/', index);
app.use('/favicon', favicon);