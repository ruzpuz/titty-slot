(function () {
    'use strict';

    module.exports = function (app) {

        app.get('/api/boobs', function (req, res) {
            var boobsService = require('./boobs.service');
            function serviceResults(err, file) {
                if(err) {
                    res.status(err.code).json(err.message);
                } else {
                    res.status(200).json(file);
                }
            }
            boobsService.getRandomPicture(serviceResults);
        });
    };
}());