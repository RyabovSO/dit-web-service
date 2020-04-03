const express = require('express');
const fourMeToHpsmRouter = require('./routes/mehpsm');
const faviconRouter = require('./routes/favicon');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})

app.use('/', fourMeToHpsmRouter);
app.use('/favicon.ico', faviconRouter);