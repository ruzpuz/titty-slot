(function () {
    'use strict';

    module.exports = function (app) {

        app.get('/api/boobs', function (req, res) {
            res.status(200).json('soon');
        });
    };
}());