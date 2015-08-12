var suq = require('suq');

suq('/a/youtube/video', function (err, data) {

    var props = data.microdata.items[0].properties;
    console.log('\n\ntitle:', props.name[0]);
    console.log('\nthumbnail:', props.thumbnailUrl[0]);
    console.log('embedURL:', props.embedURL[0]);
    console.log('\ndescription:', props.description[0]);
    console.log('\ndatePublished:', props.datePublished[0]);

});