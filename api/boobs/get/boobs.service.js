(function () {
    'use strict';

    var testFolder = './view/assets/images/boobs',
        fs = require('fs');

    function readDirectory(err, files) {
        if(err) {

        } else {
            console.log(typeof(files))
            console.log(files.length)
        }
    }
    function getRandomPicture() {
        fs.readdir(testFolder, readDirectory);
    }
    module.exports = {
        getRandomPicture : getRandomPicture
    }

}());