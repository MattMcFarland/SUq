// How to scrape image tag URLS from a website:

var suq = require('suq');
var _ = require('underscore');

var url = "http://www.ufirstgroup.com";

suq(url, function (err, json, body) {

    if (!err) {
        var images = json.images;

        console.log('\nThe Image tag URLs in the page, converted to json: \n\n', JSON.stringify(images, null, 2));             
        
        console.log('\n\nList of individual Image tag URLs, pulled from the JSON using Underscore.js and converted into valid HTML: \n\n');

        _.each(images, function (src) {
            console.log('<img src="' + src + '"/>');
        });

    }

});