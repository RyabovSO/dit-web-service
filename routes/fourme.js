const express = require('express');
const app = express();
const router = express.Router();
const base64 = require('base-64');
const fetch = require('node-fetch')

const bodyParser = require("body-parser");
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.json();

/* POST*/
router.post('/', urlencodedParser, (request, response) => {
  	//парсим request id
  	//console.log(request.body.id);
  	//console.log(request.body.custom_fields[0].value);
    //console.log(request.body.custom_fields[1].value);

    //4me header
	let requestOptionsPOST4me = {
	    method: 'PATCH',
	    headers: {
	        'Authorization': process.env.AUTHORIZATION_KEY, 
	        'X-4me-Account': 'dit-oiv-it', 
	        'api-token': process.env.TOKIEN_API, 
	        'Content-Type': 'application/x-www-form-urlencoded'
	    },
	    //body: JSON.stringify(request.body.custom_fields),
	    /*body: JSON.stringify({request.body.custom_fields}),*/
	    body: JSON.stringify({
	        custom_fields: [{
	            "id": "incident_id",
	            "value": request.body.custom_fields[0].value
	        },
	        {
	            "id": "hpc_status",
	            "value": request.body.custom_fields[1].value
	        }],
	    }),
	}

    fetch("https://dit-sd-moscow.4me.qa/v1/requests/"+request.body.id, requestOptionsPOST4me)
     .then(response => response.text())
     .then(result => {
        result = JSON.parse(result);
        //console.log(result);  
    })

    .catch(error => console.error(error))
    response.send("0");
});

module.exports = router;
