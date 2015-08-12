#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2)),
    url = argv.url || argv.u || process.argv.slice(2)[0],
    output = argv.output || argv.o || false,
    fs = require('fs'),
    path = require('path'),
    suq = require('../');


if (argv._[0] === 'help' || argv.h || argv.help
    || (process.argv.length <= 1 && process.stdin.isTTY)) {
    return fs.createReadStream(__dirname + '/usage.txt')
        .pipe(process.stdout)
        .on('close', function () { process.exit(1) })
        ;
}

if (argv.version || argv.v) {
    return console.log(require('../package.json').version);
}


if (url) {
    suq(url, function (err, data) {
        if (!output) {
            console.log(JSON.stringify(data, null, 2));
        } else {
            fs.writeFile(path.join(__dirname, output), JSON.stringify(data, null, 2), function(err){
                console.log('File ' + output + ' successfully written!');
            })
        }
    });
} else {
    return fs.createReadStream(__dirname + '/usage.txt')
        .pipe(process.stdout)
        .on('close', function () { process.exit(1) })
        ;
}

