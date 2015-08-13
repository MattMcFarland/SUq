var suq = require('../');
var cheerio = require('cheerio');
var _ = require('lodash');

suq('http://odonatagame.blogspot.com/2015/07/oh-thats-right-were-not-dead.html', function (err, data, body) {

    var $ = cheerio.load(body);

    var scraped = {
        title: data.meta.title || data.headers.h1[0],
        description: data.meta.description || $('p').text().replace(/([\r\n\t])+/ig,'').substring(0,255) +'...',
        images: _.sample(data.images, 8)
    };

    console.log(scraped);

});