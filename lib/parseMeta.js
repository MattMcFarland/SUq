module.exports = function ($, callback) {
  try {

    var $head = $('head'),
        result = {
          title:  $head.find('title').text(),
          description: $head.find('description').text(),
          keywords: $head.find('keywords').text()
        };

    callback(null, result);

  } catch (e) {
    callback(e);
  }

};