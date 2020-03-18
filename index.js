const express = require('express');
const bodyParser = require("body-parser");
const base64 = require('base-64');
const app = express();
const port = process.env.PORT || 3000;
const fetch = require('node-fetch')

//4me header
const requestOptions4me = {
    method: 'GET',
    headers: {'Authorization': process.env.AUTHORIZATION_KEY, 'X-4me-Account': 'dit-oiv-it', 'api-token': process.env.TOKIEN_API, 'Content-Type': 'application/x-www-form-urlencoded'},
    redirect: 'follow'
}

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.get('/favicon.ico', (request, response) => {
    response.send(request.params)
})

app.post('/', urlencodedParser, (request, response) => {
    //парсим request id
    var requestId = getRequestId(request.headers.link);
    console.log(requestId);

    //to 4me
    fetch("https://dit-sd-moscow.4me.qa/v1/requests/"+requestId, requestOptions4me)
    .then(response => response.text())
    .then(result => {
        result = JSON.parse(result);
        //console.log(result);

        //parse 4me record
        var bodyJira = {
            "fields": {
                "project": {
                    "key": "HEL"
                },
                "summary": "Тест HPSM интеграции",
                "description": "Описание задачи очень длинное описание",
                "issuetype": {
                    "name": "Bug"
                }
            }
        }
        //jira header
        let requestOptionsJIRA = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Basic ' + base64.encode(process.env.USERNAME_JIRA + ":" + process.env.PASSWORD_JIRA)
            },
            body: JSON.stringify(bodyJira),
            
        }
        console.log(requestOptionsJIRA);
        //

        //to JIRA
        fetch("https://jira.edu.mos.ru/rest/api/2/issue", requestOptionsJIRA)
        .then(response => response.text())
        .then(result => {
            result = JSON.parse(result);
            console.log(result);
        })
        .catch(error => console.error(error))
        //

    })
    .catch(error => console.error(error))
    //

    response.send(request.body)
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})

function getRequestId(str){
	var addres = "https://dit-sd-moscow.4me.qa/requests/";
	if (str.indexOf(addres) + 1){
    	var addresLength = addres.length;
		return ditGetSubStr(str,">").substring(str.indexOf(addres)+addresLength,str.length);
	} else {
		return "400 Bad Request"
	}
} 

function ditGetSubStr(str,symbol){
	var num = str.indexOf(symbol);
	return str.substring(0,num);
}