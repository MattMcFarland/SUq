var _ = require('lodash');

module.exports = function ($, callback) {
  try {

    var
        $head = $('head'),
        $body = $('body'),
        result = {
          title: '',
          headers: { h1: [], h2: [], h3: [], h4: [], h5: [], h6: [] },
          images: [],
          links :[]
        };

    result.title = $head.find('title').text().replace(/\n|\t/g, "");

    $body.find('h1').each(function(i, el) {

      result.headers.h1.push($(el).text().replace(/\n|\t/g, ""));

    });

    $body.find('h2').each(function(i, el) {

      result.headers.h2.push($(el).text().replace(/\n|\t/g, ""));

    });

    $body.find('h3').each(function(i, el) {

      result.headers.h3.push($(el).text().replace(/\n|\t/g, ""));

    });

    $body.find('h4').each(function(i, el) {

      result.headers.h4.push($(el).text().replace(/\n|\t/g, ""));

    });

    $body.find('h5').each(function(i, el) {

      result.headers.h5.push($(el).text().replace(/\n|\t/g, ""));

    });

    $body.find('img').each(function(i, el) {

      result.images.push($(el).attr('src'));

    });
    
    $body.find('a[href!=""]').each(function(i, el) {

        result.links.push({
            text: $(el).text().trim(),
            title: $(el).attr('title'),
            href: $(el).attr('href')
        });

    });
    
    result.links = _.compact(result.links);
    result.images = _.compact(result.images);

    callback(null, result);

  } catch (e) {
    callback(e);
  }

};