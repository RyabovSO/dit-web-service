const express = require('express');
const fourMeToJiraRouter = require('./routes/me-jira');
const fourMeToHpsmRouter = require('./routes/me-hpsm');
const faviconRouter = require('./routes/favicon');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})

app.use('/4me-jira', fourMeToJiraRouter);
app.use('/4me-hpsm', fourMeToHpsmRouter);
app.use('/favicon.ico', faviconRouter);