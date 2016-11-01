(function () {
    'use strict';

    var express  = require('express'),
        app = express(),
        fs = require('fs'),
        http = require('http'),
        serveStatic = require('serve-static'),
        bodyParser = require('body-parser');

        function startServer() {
            useStaticFolders();
            includeApiRoutes();
            var httpServer = http.createServer(app);
            httpServer.listen(8080);
        }
        function useStaticFolders() {
            app.use('/', serveStatic('./view'));
        }
        function includeApiRoutes() {
            require('./api/boobs/get/boobs.route')(app);
        }
        startServer();
}());