var suq = require('suq');
var _ = require('lodash');

function hget(model) {
    if (model[0]) {
        return (model[0])
    } else {
        return {}
    }
}


suq('/a-wordpress/blog-post', function (err, data) {

    var feed, posts, postData, postProps, author, post;

    feed = hget(_.filter(data.microformat.items, _.matches({type: ["h-feed"]})));

    if (feed) {

        posts = _.filter(feed.children, _.matches({type: ["h-entry"]}));

        if (posts) {
            postData = hget(posts);
        }

        if (postData) {

            postProps = postData.properties;

            if (postProps) {

                author = hget(_.filter(postProps.author, _.matches({type: ["h-card"]})));

                post = {
                    title: hget(postProps.name),
                    category: hget(postProps.category),
                    excerpt: hget(postProps.content).value.substring(0, 150) + '...',
                    author: hget(author.properties.name),
                    url: hget(data.microformat.rels.canonical),
                    images: _.sample(data.images, 4)
                };

                console.log(post);

            }

        }
    }

});