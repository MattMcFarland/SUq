var _ = require('lodash');

module.exports = function ($, callback) {

  try {

    var
      $head = $('head'),
      result = {};


    $head.find('link').each(function(i, el) {
      var $el = $(el);

      //xml type
      if ($el.attr('type') && $el.attr('href') && $el.attr('rel') === 'alternate' && $el.attr('type').indexOf('text/xml+oembed') > -1) {
        result[$el.attr('type')] = $el.attr('href');
      }

      //json type
      if ($el.attr('type') && $el.attr('href') && $el.attr('rel') === 'alternate' && ($el.attr('type').indexOf('text/json+oembed') > -1 || $el.attr('type').indexOf('application/json+oembed') > -1)) {
        result[$el.attr('type')] = $el.attr('href');
      }

    });

    callback(null, result);

  } catch (e) {
    console.log(e);
    callback(e);
  }

};
