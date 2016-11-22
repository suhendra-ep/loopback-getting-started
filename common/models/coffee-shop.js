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

    Coffeeshop.getName = function (shopId, cb) {
        Coffeeshop.findById(shopId, function (err, instance) {
            var response = "Name of coffee shop is " + instance.name;
            cb(null, response);
        });
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

    Coffeeshop.remoteMethod(
        'getName', {
            http: {
                path: '/getName',
                verb: 'get'
            },
            accepts: {
                arg: 'id',
                type: 'number',
                http: { source: 'query' }
            },
            returns: {
                arg: 'status',
                type: 'string'
            }
        }
    );
};
