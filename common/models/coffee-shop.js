'use strict';

module.exports = function (Coffeeshop) {
    Coffeeshop.status = function (cb) {
        var currentDate = new Date();
        var currentHour = currentDate.getHours();

        var OPEN_HOUR = 6;
        var CLOSE_HOUR = 20;

        var response = "";
        if (currentHour > OPEN_HOUR && currentHour < CLOSE_HOUR) {
            response = "We are open for business.";
        }
        else {
            response = "Sorry we are closed. Open daily from 6am to 9pm.";
        }
        cb(null, response);
    };

    Coffeeshop.remoteMethod(
        'status', {
            http: {
                path: '/status',
                verb: 'get'
            },
            returns: {
                arg: 'status',
                type: 'string'
            }
        }
    );
};
