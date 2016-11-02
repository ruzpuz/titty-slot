(function () {
    'use strict';

    module.exports = function (app) {

        app.get('/api/boobs', function (req, res) {

            var boobsService = require('./boobs.service');
            boobsService.getRandomPicture();
            res.status(200).json('soon');
        });
    };
}());