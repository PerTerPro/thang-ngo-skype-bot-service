"use strict"

const request = require('request');
const botRepo = require('../repositories/bot-repo');
const moment = require('moment');

exports.sendMessage = function (conversationid, message) {
    var options = {
        method: 'GET',
        url: 'https://thang-ngo-bot.herokuapp.com/sendMessage',
        qs:
        {
            conversationId: conversationid,
            message: message
        },
        headers:
        {
            // 'cache-control': 'no-cache',
            // Connection: 'keep-alive',
            // 'Accept-Encoding': 'gzip, deflate',
            // Host: 'thang-ngo-bot.herokuapp.com',
            // 'Postman-Token': 'd68926ee-1cb4-4ed5-8794-b3f664d5fb56,11f35f7c-03b1-4358-b9db-897806145188',
            // 'Cache-Control': 'no-cache',
            // Accept: '*/*',
            // 'User-Agent': 'PostmanRuntime/7.15.2',
            // 'Content-Type': 'application/json'
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
}

exports.convertDayWeekToIntDay = function (dayOfWeek) {
    switch (dayOfWeek.toLowerCase()) {
        case 'monday':
            return 1;
        case 'tuesday':
            return 2;
        case 'wednesday':
            return 3;
        case 'thursday':
            return 4;
        case 'friday':
            return 5;
        case 'saturday':
            return 6;
        case 'sunday':
            return 7;
        default:
            break;
    }
}

exports.convertIntDayToDayWeek = function (dayOfWeekInt) {
    switch (dayOfWeekInt) {
        case 1:
            return 'monday';
        case 2:
            return 'tuesday';
        case 3:
            return 'wednesday';
        case 4:
            return 'thursday';
        case 5:
            return 'friday';
        case 6:
            return 'saturday';
        case 7:
            return 'sunday';
        default:
            break;
    }
}
