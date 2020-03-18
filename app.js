const express = require('express');
const indexRouter = require('./routes/index');
const faviconRouter = require('./routes/favicon');

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})

app.use('/', indexRouter);
app.use('/favicon.ico', faviconRouter);