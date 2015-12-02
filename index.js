/*
 Required Modules
 */

var
  cheerio = require('cheerio'),
  request = require('request'),
  microdata = require('microdata-node'),
  _ = require('lodash');


var
  cleanMicrodata = require('./lib/cleanMicrodata'),
  cleanMicroformats = require('./lib/cleanMicroformats'),
  parseMeta = require('./lib/parseMeta'),
  parseTags = require('./lib/parseTags'),
  parseOpenGraph = require('./lib/parseOpenGraph');


var populate = {
  meta: {},
  microdata: {},
  microformat: {},
  tags: {},
  opengraph: {}
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

  loadDocument(url, function (err, body, $,  res) {
    if (!err && body) {
      cleanMicrodata(microdata.toJson(body), function (err, cleanData) {
        if (!err && cleanData) {
          populate.microdata = cleanData;
          parseMeta($, function (err, meta) {
            populate.meta = meta;
            parseTags($, function(err, tags) {
              populate.tags = tags;
              cleanMicroformats(body, function(err, mfats) {
                populate.microformat = mfats;
                parseOpenGraph($, function(err, og) {
                  populate.opengraph = og;
                  callback(null, populate, body);
                });
              })
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
