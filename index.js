/*
    Required Modules
 */

var
    cheerio = require('cheerio'),
    request = require('request'),
    microdata = require('microdata-node'),
    microformat = require('microformat-node'),
    ogs = require('./lib/ogs');

var populate = {
    meta: {},
    microdata: {},
    microformat: {},
    headers: {
        h1:[],
        h2:[],
        h3:[],
        h4:[],
        h5:[]
    },
    images: [],
    og: {}
};


var loadDocument = function (url, callback) {


    request(url, function (err, res, body) {

        if (err) {
            callback(err, null);
        } else if (body) {
            callback(null, body, cheerio.load(body));

        } else if (res) {
            callback(err, null);
        }

    });

};


module.exports = function(url, callback) {

    loadDocument(url, function(err, body, $) {

        if (err) {
            callback(err, null);
        } else if ($) {

            var $head = $('head'),
                $body = $('body');

            populate.meta.title = $head.find('title').text();
            populate.meta.description = $head.find('description').text();
            populate.meta.keywords = $head.find('keywords').text().split(',');

            populate.headers.h1.push($body.find('h1').text());
            populate.headers.h2.push($body.find('h2').text());
            populate.headers.h3.push($body.find('h3').text());
            populate.headers.h4.push($body.find('h4').text());
            populate.headers.h5.push($body.find('h5').text());

            $body.find('h1').each(function(i, el) {

                populate.headers.h1.push($(el).text().trim());

            });

            $body.find('h2').each(function(i, el) {

                populate.headers.h2.push($(el).text().trim());

            });

            $body.find('h3').each(function(i, el) {

                populate.headers.h3.push($(el).text().trim());

            });

            $body.find('h4').each(function(i, el) {

                populate.headers.h4.push($(el).text().trim());

            });

            $body.find('h5').each(function(i, el) {

                populate.headers.h5.push($(el).text().trim());

            });
            $body.find('img').each(function(i, el) {

                populate.images.push($(el).attr('src'));

            });

            populate.microdata = microdata.toJson(body);

            microformat.parseHtml(body, {}, function (err, data) {

                populate.microformat = data;


                ogs.getOG(body, function(err, data) {

                    populate.og = JSON.parse(JSON.stringify(data));
                    callback(null, JSON.parse(JSON.stringify(populate, null, 2)), body);

                });
            });
        }
    });
};
