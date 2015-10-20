var _ = require('lodash');

module.exports = function ($, callback) {
  //console.log('trying to get meta');
  try {

    var
      $head = $('head'),
      result = {};


    $head.find('meta').each(function(i, el) {
      var $el = $(el);

      if ($el.attr('property') && $el.attr('content') && $el.attr('content').indexOf(':' > -1)) {
        result[$el.attr('property')] = $el.attr('content');
      }

    });

    callback(null, result);

  } catch (e) {
    console.log(e);
    callback(e);
  }

};