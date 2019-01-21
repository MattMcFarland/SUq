const fs = require('fs');
const test = require('tape');
const parseTwitterCard = require('../lib/parseTwitterCard');
const { $: parsedHtml } = require('./fixtures/sample');
const expected = {
    'twitter:card': 'summary',
    'twitter:site': '@nytimesbits',
    'twitter:creator': '@nickbilton',
}

test('parseTags.js', function (t) {
    t.plan(2);
    parseTwitterCard(parsedHtml, (err, data) => {
         t.equal(err, null, 'should return callback without error');
         t.deepEqual(expected, data);
    })
});
