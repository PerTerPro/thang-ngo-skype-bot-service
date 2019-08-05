"use strict"

const request = require('request');
const botRepo = require('../repositories/bot-repo');
const moment = require('moment');

exports.sendMessage = function (conversationid, message) {
    var options = {
        method: 'GET',
        // url: 'https://thang-ngo-bot.herokuapp.com/sendMessage?conversationId=' + conversationid + '&message=' + message,
        url: 'https://thang-ngo-bot.herokuapp.com/sendMessage',
        headers:{
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'
        },
        qs:
        {
            conversationid: decodeURI(conversationid),
            message: decodeURI(message)
        }
        // method: 'GET',
        // // url: 'https://thang-ngo-bot.herokuapp.com/sendMessage?conversationId=' + conversationid + '&message=' + message,
        // url: 'http://bot.websosanh.vn/api/SendMessage/post',
        // headers:{
        //     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'
        // },
        // qs:
        // {
        //     conversationid: '29:1RUJS45u4ZHAfHehFKcMOrIkZearj5X0fdZHCKozGwng',
        //     message: 'haha'
        // }        
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
    // var url = 'https://thang-ngo-bot.herokuapp.com/sendMessage?conversationId=' + conversationid + '&message=' + message;
    // // request(url, (err, res, body) => {
    // //     if (err) { return console.log(err); }
    // //     console.log(body.url);
    // //     console.log(body.explanation);
    // // })
    // request.get(url, function (err, res, body) {
    //     if (err) { return console.log(err); }
    //     console.log(body.url);
    //     console.log(body.explanation);
    // });
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
