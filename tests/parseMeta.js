const fs = require('fs');
const test = require('tape');
const parseMeta = require('../lib/parseMeta');
const { $: parsedHtml } = require('./fixtures/sample');
const expected = { 
    description: 'Free Web tutorials',
    keywords: 'HTML,CSS,XML,JavaScript',
    author: 'Hege Refsnes',
    'twitter:card': 'summary',
    'twitter:site': '@nytimesbits',
    'twitter:creator': '@nickbilton' 
}

test('parseMeta.js', function (t) {
    t.plan(2);
    parseMeta(parsedHtml, (err, data) => {
         t.equal(err, null, 'should return callback without error');
         t.deepEqual(expected, data);
    })
});


