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
  	//парсим request id
    var requestId = getRequestId(request.headers.link);
    console.log(requestId);

    //to 4me record
    fetch("https://dit-sd-moscow.4me.qa/v1/requests/"+requestId, requestOptions4me)
    .then(response => response.text())
    .then(resultRequest => {
        resultRequest = JSON.parse(resultRequest);

        //to 4me people
        fetch("https://dit-sd-moscow.4me.qa/v1/people/"+resultRequest.requested_for.id, requestOptions4me)
         .then(response => response.text())
         .then(resultPeople => {
            resultPeople = JSON.parse(resultPeople);

            //to 4me notes
            fetch("https://dit-sd-moscow.4me.qa/v1/requests/"+requestId+"/notes", requestOptions4me)
            .then(response => response.text())
            .then(resultNotes => {
                resultNotes = JSON.parse(resultNotes);
                //console.log(resultNotes[0].text);
                //console.log(resultRequest.requested_for.id);
                console.log(resultPeople.primary_email);
                //body
                var bodyHpsm = {
                    "HPSMInteraction4meREST": {
                        //"User": resultRequest.requested_for.name,
                        "Description": [resultNotes[0].text],
                        "Email": resultPeople.primary_email,
                        "Title":  resultRequest.subject
                    }
                }
                //sm header
		    	let requestOptionsHPSM = {
		    	    method: 'POST',
		    	    headers: {
		    	        'Content-Type': 'application/json',
                        'Connection': 'keep-alive',
		    	        'Authorization' : 'Basic ' + base64.encode(process.env.USERNAME_HPSM + ":" + process.env.PASSWORD_HPSM)
		    	    },
		    	    body: JSON.stringify(bodyHpsm),
		    	}
    
                //to hpsm
                fetch("http://212.11.152.73:13081/SM/9/rest/HPSMInteraction4meREST/", requestOptionsHPSM)
                .then(response => response.text())
                .then(result => {
                    result = JSON.parse(result);
                    console.log(result.HPSMInteraction4meREST.ID);
                    let requestOptionsPOST4me = {
                        method: 'PATCH',
                        headers: {
                            'Authorization': process.env.AUTHORIZATION_KEY, 
                            'X-4me-Account': 'dit-oiv-it', 
                            'api-token': process.env.TOKIEN_API, 
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: JSON.stringify({
                            custom_fields: [{
                                "id": "incident_id",
                                "value": result.HPSMInteraction4meREST.ID
                            }],
                        }),
                    }
                    console.log(requestOptionsPOST4me); 

                    fetch("https://dit-sd-moscow.4me.qa/v1/requests/"+requestId+"/notes", requestOptionsPOST4me)
                     .then(response => response.text())
                     .then(resultEnd => {
                        resultEnd = JSON.parse(resultEnd);
                        console.log(resultEnd);  
                        return;
                    })
                    .catch(error => console.error(error))
                })
                .catch(error => console.error(error))
            })
            .catch(error => console.error(error))
        })
         .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
    //
    
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