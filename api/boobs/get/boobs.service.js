(function () {
    'use strict';

    var testFolder = './view/assets/images/boobs',
        fs = require('fs');


    function getRandomPicture(callback) {
        function readDirectory(err, files) {
            if(err) {
                callback({
                    "code" : 500,
                    "message" : 'Unable to read folder',
                    "details" : err
                });
            } else {
                files = files.filter(function (item) {
                    return !(/(^|\/)\.[^\/\.]/g).test(item);
                });
                if(files.length === 0) {
                    callback({
                        "code" : 404,
                        "message" : 'No files found - switch to default one'
                    });
                } else {
                    callback(null, files[Math.floor(Math.random() * files.length)])
                }
            }
        }
        fs.readdir(testFolder, readDirectory);
    }
    module.exports = {
        getRandomPicture : getRandomPicture
    }

}());