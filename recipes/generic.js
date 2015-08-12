var suq = require('../');
var cheerio = require('cheerio');
var _ = require('lodash');

suq('https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet#XSS_Locator', function (err, data, body) {

    var $ = cheerio.load(body);

    var scraped = {
        title: data.meta.title || data.headers.h1[0],
        description: data.meta.description || $('p').text().replace(/([\r\n\t])+/ig,'').substring(0,255) +'...',
        images: _.sample(data.images, 8)
    };

    console.log(scraped);

});