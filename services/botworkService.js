"use strict"

// const botRepo = require('../repositories').BotRepo;
const utilService = require('./utilService');
const botRepo = require('../repositories/bot-repo');
const moment = require('moment');
const _ = require('lodash');

exports.getRunWorks = function () {
    botRepo.getRunWorks().then(function (results) {
        var currentDate = moment().startOf('day');
        var currentTime = "11:27"; 
        // moment().format('HH:mm');
        // var a = results;
        results.forEach(element => {
            var trigger = element.trigger;
            var startDate = trigger.startDate ? moment(trigger.startDate, 'DD/MM/YYYY') : null;
            var endDate = moment(trigger.endDate, 'DD/MM/YYYY');
            var countDay = endDate.diff(currentDate, 'days');
            if (countDay > -1) {
                if(trigger.timeOfDay == currentTime){
                    switch (trigger.typeTrigger) {
                        case 1:
                            utilService.sendMessage(element.conversationId, element.message);
                            break;
                        case 2:
                            if(currentDate.diff(startDate, 'days') > -1){
                                utilService.sendMessage(element.conversationId, element.message);
                            }
                            break;
                        case 3:
                            var m = currentDate.isoWeekday();
                            var currentDayOfWeek = utilService.convertIntDayToDayWeek(m);
                            if(_.map(trigger.dayOfWeek, function(n,i){return n.toLowerCase();}).filter(x => x == currentDayOfWeek).length > 0){
                                utilService.sendMessage(element.conversationId, element.message);
                            }
                            break;
                        case 4:
                            var curMonth = currentDate.month();
                            var curDay = currentDate.day();
                            if(trigger.month.filter(x => x == curMonth).length > 0 && trigger.dayOfMonth.filter(x => x == curDay).length > 0){
                                utilService.sendMessage(element.conversationId, element.message);
                            }
                            break;
                        default:
                            break;
                    }
                    // botRepo.setIsSended(element, true);
                }
            }
        });
    });
}
