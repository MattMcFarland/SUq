const fs = require('fs');
const test = require('tape');
const parseOpenGraph = require('../lib/parseOpenGraph');
const { $: parsedHtml } = require('./fixtures/sample');
const expected = { 
    'og:url': 'http://bits.blogs.nytimes.com/2011/12/08/a-twitter-for-my-sister/',
    'og:title': 'A Twitter for My Sister',
    'og:description': 'In the early days, Twitter grew so quickly that it was almost impossible to add new features because engineers spent their time trying to keep the rocket ship from stalling.',
    'og:image': 'http://graphics8.nytimes.com/images/2011/12/08/technology/bits-newtwitter/bits-newtwitter-tmagArticle.jpg' 
}

test('parseTags.js', function (t) {
    t.plan(2);
    parseOpenGraph(parsedHtml, (err, data) => {
         t.equal(err, null, 'should return callback without error');
         t.deepEqual(expected, data);
    })
});
