var _ = require('lodash');

module.exports = function ($, callback) {

  try {

    var
      $head = $('head'),
      result = {};


    $head.find('meta').each(function(i, el) {
      var $el = $(el);

      if ($el.attr('property') && $el.attr('content') && $el.attr('property').indexOf('og:') > -1) {
        result[$el.attr('property')] = $el.attr('content');
      }

    });

    callback(null, result);

  } catch (e) {
    console.log(e);
    callback(e);
  }

};
