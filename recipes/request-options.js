var suq = require('suq');

suq('http://www.nytimes.com/2016/01/31/books/review/the-powers-that-were.html', function (err, data, body) {

    console.log(data);

}, { jar: true });