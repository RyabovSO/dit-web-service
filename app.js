const express = require('express');
const indexRouter = require('./routes/index');
const faviconRouter = require('./routes/favicon');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})

app.use('/', indexRouter);
app.use('/favicon.ico', faviconRouter);