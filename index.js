/* global require, module */
var ApiBuilder = require('claudia-api-builder');
var api = new ApiBuilder();

api.get("/hello/{name}/{superpower}", function (request) {
    var name = request.pathParams.name;
    return 'Hello World - meet ' + name + 'has superpower' + request.pathParams.superpower;
});

module.exports = api;