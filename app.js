
require('dotenv').config();
var botService = require('./services/botworkService');

var moment = require('moment');

const restify = require('restify');
const server = restify.createServer();

// using plugin của restify 
//http://restify.com/docs/plugins-api/#queryparser
server.use(restify.plugins.queryParser());

server.listen(process.env.port || process.env.PORT || 67891, function () {
    console.log('%s listening to %s', server.name, server.url);
    
    setInterval(function () {
        botService.getRunWorks();
    }, 15000);
});


