const express = require('express');
const app = express();
const router = express.Router();
const base64 = require('base-64');
const fetch = require('node-fetch')

const bodyParser = require("body-parser");
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});

//4me header
const requestOptions4me = {
    method: 'GET',
    headers: {'Authorization': process.env.AUTHORIZATION_KEY, 'X-4me-Account': 'dit-oiv-it', 'api-token': process.env.TOKIEN_API, 'Content-Type': 'application/x-www-form-urlencoded'},
    redirect: 'follow'
}

/* POST*/
router.post('/', urlencodedParser, (request, response) => {

    response.send(
	{
		"id_char":"1",
		"surname":"Иванов",
		"name":"Иван",
		"patronymic":"Иванович",
		"work_phone":"89778899769",
		"email":"test1@test.ru",
		"name_departament":"DIT",
		"name_position":"ARMA"
	},
	{
		"id_char":"2",
		"surname":"Петров",
		"name":"Петр",
		"patronymic":"Петрович",
		"work_phone":"89778997655",
		"email":"test2@test.ru",
		"name_departament":"DIT",
		"name_position":"ARMA"
	}
)
});

module.exports = router;