const fs = require('fs');
const test = require('tape');
const parseOembed = require('../lib/parseOembed');
const { $: parsedHtml } = require('./fixtures/sample');

const expected = {
    'text/xml+oembed': "https://namchey.com/api/oembed?url=https%3A%2F%2Fnamchey.com%2Fitineraries%2Ftilicho&format=xml",
    'text/json+oembed': "https://namchey.com/api/oembed?url=https%3A%2F%2Fnamchey.com%2Fitineraries%2Ftilicho&format=json"
};

test('parseOembed.js', function (t) {
    t.plan(2);
    parseOembed(parsedHtml, (err, data) => {
         t.equal(err, null, 'should return callback without error');
         t.deepEqual(expected, data);
    });
});
