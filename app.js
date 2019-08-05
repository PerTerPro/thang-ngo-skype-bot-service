
require('dotenv').config();
var botService = require('./services/botworkService');
var moment = require('moment');

setInterval(function () {
    console.log('currentDate', moment().format('DD/MM/YYYY - HH:mm:ss'));
    botService.getRunWorks();
}, 15000);




// var request = require('request');

// var count = 1;
// setInterval(function () {
//     console.log('Run...');
//     var options = {
//         method: 'GET',
//         url: 'http://bot.websosanh.vn/api/SendMessage/post',
//         qs:
//         {
//             conversationid: '29:1RUJS45u4ZHAfHehFKcMOrIkZearj5X0fdZHCKozGwng',
//             message: count
//         }
//     };

//     request(options, function (error, response, body) {
//         if (error) throw new Error(error);
//         count++;
//         console.log(body);
//     });

// }, 1000);


