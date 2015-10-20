/*
 Required Modules
 */

var
  chalk = require('chalk'),
  cheerio = require('cheerio'),
  request = require('request'),
  microdata = require('microdata-node'),
  microformat = require('microformat-node'),
  _ = require('lodash');


var
  cleanMicrodata = require('./lib/cleanMicrodata'),
  cleanMicroformats = require('./lib/cleanMicroformats'),
  parseMeta = require('./lib/parseMeta'),
  parseTags = require('./lib/parseTags'),
  ogs = require('./lib/ogs');


var populate = {
  meta: {},
  microdata: {},
  microformat: {},
  tags: {},
  og: {}
};


var loadDocument = function (url, callback) {

  request(url, function (err, res, body) {

    if (err) {
      callback(err, null);
    } else if (body && res) {
      callback(null, body, cheerio.load(body), res);
    } else {
      callback('No Response');
    }

  });

};



var parse = function(url, callback, opts) {

  /**
  loadDocument(url, function(err, body, $, res) {

    if (err) {
      callback(err, null);
    } else if ($) {

      var $head = $('head'),
          $body = $('body');

      if (opts.meta) {
        populate.meta.title = $head.find('title').text();
        populate.meta.description = $head.find('description').text();
        populate.meta.keywords = $head.find('keywords').text().split(',');
      }

      if (opts.headers) {


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
      }

      if (opts.images) {
        $body.find('img').each(function(i, el) {

          populate.images.push($(el).attr('src'));

        });
      }


      if (opts.microdata) {
        populate.microdata = microdata.toJson(body);
      }


      if (opts.microformats) {
        microformat.parseHtml(body, {}, function (err, data) {
          if (err) {
            callback(err);
          } else {

            populate.microformat = data;

            if (opts.og) {
              ogs.getOG(body, function(err, data) {
                if (err) {
                  callback(err);
                } else {
                  populate.og = JSON.parse(JSON.stringify(data));
                  callback(null, JSON.parse(JSON.stringify(populate, null, 2)), body);
                }
              });
            } else {
              callback(null, JSON.parse(JSON.stringify(populate, null, 2)), body);
            }
          }
        });
      } else if (opts.og) {
        ogs.getOG(body, function(err, data) {
          if (err) {
            callback (err);
          } else {
            populate.og = JSON.parse(JSON.stringify(data));
            callback(null, JSON.parse(JSON.stringify(populate, null, 2)), body);
          }
        });
      }
    }
  });
  **/

  //Microdata only
  loadDocument(url, function (err, body, $,  res) {
    if (!err && body) {
      cleanMicrodata(microdata.toJson(body), function (err, cleanData) {
        if (!err && cleanData) {
          populate.microdata = cleanData;
          parseMeta($, function (err, meta) {
            populate.meta = meta;
            parseTags($, function(err, tags) {
              populate.tags = tags;
              callback(null, populate);
            })
          });
        } else {
          callback(err || 'CleanData fail');
        }
      });
    } else {
      callback(err || 'No response');
    }
  })
};



module.exports = function (url, callback) {


  parse(url, function (err, data, body) {
    callback(err, data, body);
  });


};
