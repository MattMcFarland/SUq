var suq = require('suq');

suq('https://www.youtube.com/watch?v=Xft3asYLKo0', function (err, data) {

    if (!err) {      
        var props = data.microdata.items[0].properties;
        console.log('\n\ntitle:', props.name[0]);
        console.log('\nthumbnail:', props.thumbnailUrl[0]);
        console.log('embedURL:', props.embedURL[0]);
        console.log('\ndescription:', props.description[0]);
        console.log('\ndatePublished:', props.datePublished[0]);
    }
});