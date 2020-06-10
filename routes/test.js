const express = require('express');
const app = express();
const router = express.Router();

/* POST*/
router.get('/', (request, response) => {

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