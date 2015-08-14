[![NPM](https://nodei.co/npm/suq.png)](https://npmjs.org/package/suq)

## SUq

Scraping Utility for lazy people.
MIT Licensed

Here's a simple node module that will allow you to asynchronously scrape opengraph tags, microformats, microdata, header tags, images, classic meta, and whatever else you want with minimal effort.
You can output the scraped data in the command line, or you can output scraped data as a JSON object.
If you don't want the scraped data yet, and still want to fine tune and grab more data from the html, no problem.  You can extend suq as much as you want, it doesn't care.

* [Command line Usage](#command-line-usage)
* [Basic Usage](#basic-usage)
* [Opengraph](#opengraph)
* [Microformat](#microformat)
* [Microdata](#microdata)
* [headers](#headers)
* [images](#images)
* [meta](#meta)
* [extending](#extending)
* [recipes](./recipes)
* [Mentions](#mentions)

### Command line usage:

Scrape a website and output the data to command line.

suq can be used in the command line when installed globally.

```
npm install suq -g

suq http://www.example.com > example.json

suq -u http://www.example.com -o example.json

suq --url http://www.example.com --output example.json

```



### Basic usage

How to scrape a website and convert structured data to json, and keep the html data as well (in case you're not done with it yet)


```javascript
var suq = require('suq');

var url = "http://www.example.com";

suq(url, function (err, json, body) {

    if (!err) {
        console.log('scraped json is:', JSON.stringify(json, null, 2));
        console.log('html body is', body);
    }

});

```


### Opengraph

How to scrape a website and store its opengraph tags.


```javascript
var suq = require('suq');
var url = "http://www.example.com";

suq(url, function (err, json, body) {

    if (!err) {
        var openGraphTags = json.og;
        console.log(JSON.stringify(openGraphTags, null, 2));
    }

});

```

### Microformat

How to scrape a website and store its microformats version 1 and 2 data.


```javascript
var suq = require('suq');
var url = "http://www.example.com";

suq(url, function (err, json, body) {

    if (!err) {
        var microformat = json.microformat;
        DoSomethingCool(microformat);
    }

});

```

### Microdata

How to scrape a website and store its schema.org microdata.


```javascript
var suq = require('suq');
var url = "http://www.example.com";

suq(url, function (err, json, body) {

    if (!err) {
        var microdata = json.microdata;
        DoSomethingCool(microdata);
    }

});

```

### Headers

How to scrape header tags from a URL:


```javascript
var suq = require('suq');
var url = "http://www.example.com";

suq(url, function (err, json, body) {

    if (!err) {
        var headers = json.headers;

        var title = json.headers.h1[0];
        var subtitle = json.headers.h2[0];

    }

});

```

### Images

How to scrape image tag URLS from a website:

```javascript
var suq = require('suq');
var _ = require('lodash');
var url = "http://www.example.com";

suq(url, function (err, json, body) {

    if (!err) {
        var images = json.images;

        _.each(images, function (src) {
            makeSomeHTML('<img src="' + src + '"/>');
        });

    }

});

```

### Meta

How to scrape meta title and description from a URL:


```javascript
var suq = require('suq');
var url = "http://www.example.com";

suq(url, function (err, json, body) {

    if (!err) {
        var title = json.meta.title;
        var description = json.meta.description;
    }

});
```

### Extending

SUq is a node module that lets you scrape website data and customize what you want because it doesnt drop the html body from the request.

In this example we scrape an unordered list with the class "grocerylist" and scrape all the p tags too for fun.

```javascript
var suq = require('suq');
var cheerio = require('cheerio');
var url = "http://www.example.com";

suq(url, function (err, json, body) {

    var $ = cheerio.load(body);


    $('body').find('p').each(function(i, el) {

        json.pTags.push($(el).text().trim());

    });

    $('body').find('ul.grocerylist').find('li').each(function(i, el) {

        json.groceryList.push($(el).text().trim());

    });

    NowDoSomethingCool(json);
});
```

### Mentions

SUq was made possible by:

* [cheerio by Matt Mueller](https://github.com/cheeriojs/cheerio.git)

* [lodash by John-David Dalton](https://lodash.com/)

* [microdata-node by Jan Potoms](https://github.com/Janpot/microdata-node)

* [microformat-node by Glenn Jones](https://github.com/glennjones/microformat-node#readme)

* [minimist by James Halliday](https://github.com/substack/minimist)

* [request by Mikeal Rogers](https://github.com/request/request#readme)

* [openGraphScraper by Josh Shemas](http://github.com/jshemas/openGraphScraper)

* And of course the awesome folks over at nodeJS.org


A huge THANK YOU goes out to all of you for making this easy for me..  :)
