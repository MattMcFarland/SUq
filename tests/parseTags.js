const fs = require('fs');
const test = require('tape');
const parseTags = require('../lib/parseTags');
const { $: parsedHtml } = require('./fixtures/sample');
const expected = { 
    title: 'My cool website',
    headers: { h1: [ 'Lorem' ], h2: [ 'images' ], h3: [], h4: [], h5: [], h6: [] },
    images: [ '/cat1.jpg', '/cat2.jpg', '/cat3.jpg', '/cat4.jpg' ],
    links: [ { text: '', title: undefined, href: '#' },
    { text: '', title: undefined, href: '#' },
    { text: '', title: undefined, href: '#' },
    { text: '', title: undefined, href: '#' },
    { text: 'more stuff', title: undefined, href: '/more' } ] 
}

test('parseTags.js', function (t) {
    t.plan(2);
    parseTags(parsedHtml, (err, data) => {
         t.equal(err, null, 'should return callback without error');
         t.deepEqual(expected, data);
    })
});
