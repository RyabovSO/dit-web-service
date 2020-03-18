var express = require('express');
var router = express.Router();

/* get*/
router.get('/favicon.ico', (request, response) => {
    response.send(request.params)
})

module.exports = router;