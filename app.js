const express = require('express');
const test = require('./routes/test');
//const fourMeToJiraRouter = require('./routes/jira');
//const fourMeToHpsmRouter = require('./routes/hpsm');
//const hpsmToFourMeRouter = require('./routes/fourme');
//const faviconRouter = require('./routes/favicon');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})
app.use('/test', test);
//app.use('/fourme', hpsmToFourMeRouter);
//app.use('/hpsm', fourMeToHpsmRouter);
//app.use('/jira', fourMeToHpsmRouter);
//app.use('/favicon.ico', faviconRouter);