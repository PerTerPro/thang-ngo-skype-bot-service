
require('dotenv').config();
const botService = require('./services/botworkService');
const timeZone = "Asia/Ho_Chi_Minh";
const moment = require('moment-timezone');
// botService.getRunWorks();

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

    var oldDate = moment().tz(timeZone).startOf('day');
    setInterval(function () {

        let endDate = moment().tz(timeZone).startOf('day');

        let countDay = endDate.diff(oldDate, 'days');

        if (countDay < 0) {
            oldDate = endDate;
            botService.setIsSendedAll();
            console.log('countDay', countDay);
        }
    }, 1000);
});


