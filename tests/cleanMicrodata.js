const test = require('tape');
const cleanMicrodata = require('../lib/cleanMicrodata');
const rawMicrodata = require('./fixtures/rawMicrodata.json');
const cleanedMicrodata = require('./fixtures/cleanedMicrodata.json');

test('cleanMicrodata.js', function (t) {
    t.plan(2);

    cleanMicrodata(rawMicrodata, (err, data) => {
        t.equal(err, null, 'should return callback without error');
        t.deepEqual(data, cleanedMicrodata, 'should return callback with cleaned microdata');
    });
});


