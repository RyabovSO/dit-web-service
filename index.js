const express = require('express');
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.get('/favicon.ico', (request, response) => {
    response.send(request.params)
})

app.get('/:telephone', (request, response) => {
    response.send(request.params.telephone)
})

app.post('/', urlencodedParser, (request, response) => {
    console.log(request.headers);
    response.send(request.body)
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})