const express = require('express');
const app = express();
const router = express.Router();
const base64 = require('base-64');
const fetch = require('node-fetch')

const bodyParser = require("body-parser");
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: true});

//4me header
const requestOptions4me = {
    method: 'GET',
    headers: {'Authorization': process.env.AUTHORIZATION_KEY, 'X-4me-Account': 'dit-oiv-it', 'api-token': process.env.TOKIEN_API, 'Content-Type': 'application/x-www-form-urlencoded'},
    redirect: 'follow'
}

/* POST*/
router.post('/', (request, response) => {
  	//парсим request id
    console.log(request);
    response.send(request.body)
});

module.exports = router;
