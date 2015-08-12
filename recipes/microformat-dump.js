var suq = require('../');
var cheerio = require('cheerio');
var _ = require('lodash');

suq('https://blog.agilebits.com/2015/06/17/1password-inter-process-communication-discussion/', function (err, data, body) {

    console.log(JSON.stringify(data));

});