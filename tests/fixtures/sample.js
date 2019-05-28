const html = `
<html>
<head>
    <meta charset="UTF-8">
    <meta name="description" content="Free Web tutorials">
    <meta name="keywords" content="HTML,CSS,XML,JavaScript">
    <meta name="author" content="Hege Refsnes">
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@nytimesbits" />
    <meta name="twitter:creator" content="@nickbilton" />
    <meta property="og:url" content="http://bits.blogs.nytimes.com/2011/12/08/a-twitter-for-my-sister/" />
    <meta property="og:title" content="A Twitter for My Sister" />
    <meta property="og:description" content="In the early days, Twitter grew so quickly that it was almost impossible to add new features because engineers spent their time trying to keep the rocket ship from stalling." />
    <meta property="og:image" content="http://graphics8.nytimes.com/images/2011/12/08/technology/bits-newtwitter/bits-newtwitter-tmagArticle.jpg" />
    <link rel="alternate" type="text/xml+oembed" href="https://namchey.com/api/oembed?url=https%3A%2F%2Fnamchey.com%2Fitineraries%2Ftilicho&amp;format=xml">
    <link rel="alternate" type="text/json+oembed" href="https://namchey.com/api/oembed?url=https%3A%2F%2Fnamchey.com%2Fitineraries%2Ftilicho&amp;format=json">
    <title>My cool website</title>

</head>

<body>
    <h1>Lorem</h1>
    <p>Ipsum???</p>
    <h2>images</h2>
    <ul>
        <li><a href="#"><img src="/cat1.jpg"/></a></li>
        <li><a href="#"><img src="/cat2.jpg"/></a></li>
        <li><a href="#"><img src="/cat3.jpg"/></a></li>
        <li><a href="#"><img src="/cat4.jpg"/></a></li>
    </ul>
    <footer>
        <a href="/more">more stuff</a>
    </footer>
</body>

</html>
`
module.exports = {
    html,
    $: require('cheerio').load(html)
}
