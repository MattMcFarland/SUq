var _ = require('lodash');

module.exports = function ($, callback) {
  try {

    var
        $body = $('body'),
        result = {
          headers: { h1: [], h2: [], h3: [], h4: [], h5: [], h6: [] },
          images: []
        };

    $body.find('h1').each(function(i, el) {

      result.headers.h1.push($(el).text().trim());

    });

    $body.find('h2').each(function(i, el) {

      result.headers.h2.push($(el).text().trim());

    });

    $body.find('h3').each(function(i, el) {

      result.headers.h3.push($(el).text().trim());

    });

    $body.find('h4').each(function(i, el) {

      result.headers.h4.push($(el).text().trim());

    });

    $body.find('h5').each(function(i, el) {

      result.headers.h5.push($(el).text().trim());

    });

    $body.find('img').each(function(i, el) {

      result.images.push($(el).attr('src'));

    });

    result.images = _.compact(result.images);

    callback(null, result);

  } catch (e) {
    callback(e);
  }

};