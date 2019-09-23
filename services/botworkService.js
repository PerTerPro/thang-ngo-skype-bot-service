"use strict"

// const botRepo = require('../repositories').BotRepo;
const utilService = require('./utilService');
const botRepo = require('../repositories/bot-repo');
// const moment = require('moment');
const moment = require('moment-timezone');
const _ = require('lodash');
const timeZone = "Asia/Ho_Chi_Minh";

exports.getRunWorks = function () {
    botRepo.getRunWorks().then(function (results) {
        console.log('Bot Work can be send: ' + results.length + ' - Time: ' + moment().tz(timeZone).format('DD/MM/YYYY - HH:mm'));
        var currentDate = moment().tz(timeZone).startOf('day');
        var currentTime = moment().tz(timeZone).format('HH:mm');      

        results.forEach(element => {
            var trigger = element.trigger;
            var startDate = trigger.startDate ? moment(trigger.startDate, 'DD/MM/YYYY') : null;
            var endDate = moment(trigger.endDate, 'DD/MM/YYYY');
            var countDay = endDate.diff(currentDate, 'days');
            if (countDay > -1) {
                if(trigger.timeOfDay == currentTime) {
                    switch (trigger.typeTrigger) {
                        case 1:
                            utilService.sendMessage(element.conversationSendId, element.message, function() {
                                botRepo.setIsSended(element, true).then(function (res) {
                                    // callback
                                });
                            });
                            break;
                        case 2:
                            if(currentDate.diff(startDate, 'days') > -1){
                                utilService.sendMessage(element.conversationSendId, element.message, function() {
                                    botRepo.setIsSended(element, true).then(function (res) {
                                        // callback
                                    });
                                });
                            }
                            break;
                        case 3:
                            let m = currentDate.isoWeekday();
                            let currentDayOfWeek = utilService.convertIntDayToDayWeek(m);
                            if(_.map(trigger.dayOfWeek, function(n,i){return n.toLowerCase();}).filter(x => x == currentDayOfWeek).length > 0){
                                utilService.sendMessage(element.conversationSendId, element.message, function() {
                                    botRepo.setIsSended(element, true).then(function (res) {
                                        // callback
                                    });
                                });
                            }
                            break;
                        case 4:
                            let curMonth = currentDate.month();
                            let curDay = currentDate.day();
                            if(trigger.month.filter(x => x == curMonth).length > 0 && trigger.dayOfMonth.filter(x => x == curDay).length > 0){
                                utilService.sendMessage(element.conversationSendId, element.message, function() {
                                    botRepo.setIsSended(element, true).then(function (res) {
                                        // callback
                                    });
                                });
                            }
                            break;
                        default:
                            break;
                    }
                    // botRepo.setIsSended(element, true).then(function(res){
                    //     // callback
                    // });
                }
            }
        });
    });
}

exports.setIsSendedAll = function(){
    botRepo.setIsSendedAll(false).then(function (results) {
        console.log('Refresh All IsSended');
    });
}
