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
router.post('/hpsm', urlencodedParser, (request, response) => {
  	//парсим request id
    var requestId = getRequestId(request.headers.link);
    console.log(request.headers.link);

    //to 4me record
    /*fetch("https://dit-sd-moscow.4me.qa/v1/requests/"+requestId, requestOptions4me)
    .then(response => response.text())
    .then(resultRequest => {
        resultRequest = JSON.parse(resultRequest);

        //to 4me notes
        fetch("https://dit-sd-moscow.4me.qa/v1/requests/"+requestId+"/notes", requestOptions4me)
        .then(response => response.text())
        .then(resultNotes => {
            resultNotes = JSON.parse(resultNotes);
            //console.log(resultNotes[0].text);

            //body
            var bodyHpsm = {
                "fields": {
                    "project": {
                        "key": "HEL"
                    },
                    "summary": resultRequest.subject,
                    "description": resultNotes[0].text,
                    "issuetype": {
                        "name": "Bug"
                    }
                }
            }
            //sm header
			let requestOptionsHPSM = {
			    method: 'POST',
			    headers: {
			        'Content-Type': 'application/json',
			        'Authorization' : 'Basic ' + base64.encode(process.env.USERNAME_JIRA + ":" + process.env.PASSWORD_JIRA)
			    },
			    body: JSON.stringify(bodyJira),
			}

            //to hpsm

            fetch("https://jira.edu.mos.ru/rest/api/2/issue", requestOptionsJIRA)
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result);
                console.log(result.id);
            })
            .catch(error => console.error(error))
            
        })
    })
    .catch(error => console.error(error))
    //
    */
    response.send(request.body)
});

module.exports = router;

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