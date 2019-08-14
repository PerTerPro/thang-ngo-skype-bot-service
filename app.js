
require('dotenv').config();
const botService = require('./services/botworkService');
const utilService = require('./services/utilService');
const timeZone = "Asia/Ho_Chi_Minh";
const moment = require('moment-timezone');
// botService.getRunWorks();

const restify = require('restify');
const server = restify.createServer();
var oldDate = moment().tz(timeZone).startOf('day');

// using plugin của restify 
//http://restify.com/docs/plugins-api/#queryparser
server.use(restify.plugins.queryParser());

server.listen(process.env.port || process.env.PORT || 67891, function () {
    console.log('%s listening to %s', server.name, server.url);

    // Service ping api 15' / lần
    setInterval(function () {
        console.log('ping api');
        utilService.pingApi('https://thang-ngo-bot.herokuapp.com/');
        utilService.pingApi('https://thang-ngo-bot-service.herokuapp.com/');
    }, 900000);

    // Service chạy 15s / lần
    setInterval(function () {
        botService.getRunWorks();
    }, 15000);

    // Service chạy khi qua ngày mới => refresh những work đã send trong ngày hum qua.  

    setInterval(function () {
        let endDate = moment().tz(timeZone).startOf('day');
        // console.log(oldDate);
        let countDay = endDate.diff(oldDate, 'days');

        if (countDay > 0) {
            oldDate = endDate;
            botService.setIsSendedAll();
            console.log('countDay', countDay);
        }
    }, 1000);
});

server.get('/', function (req, res, next) {
    res.send('Service run phục vụ cho Bot của Thắng Ngô :v');
});


