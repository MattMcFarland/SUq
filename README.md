[![NPM](https://nodei.co/npm/suq.png)](https://npmjs.org/package/suq)

## SUq

Scraping Utility for lazy people.
MIT Licensed

Here's a simple node module that will allow you to asynchronously scrape opengraph tags, microformats, microdata, header tags, images, classic meta, and whatever else you want with minimal effort.
You can output the scraped data in the command line, or you can output scraped data as a JSON object.
If you don't want the scraped data yet, and still want to fine tune and grab more data from the html, no problem.  You can extend suq as much as you want, it doesn't care.

* [Recipes](./recipes)
* [Command line Usage](#command-line-usage)
* [Basic Usage](#basic-usage)
* [Opengraph](#opengraph)
* [Microformat](#microformat)
* [Microdata](#microdata)
* [Headers](#headers)
* [Images](#images)
* [Meta](#meta)
* [Signature](#signature)
* [Extending](#extending)
* [Mentions](#mentions)

### Command line usage:

Scrape a website and output the data to command line.

suq can be used in the command line when installed globally, outputting scraped data to `stdout`

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
        console.log(JSON.stringify(microformat, null, 2));
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


### Signature

If you are familiar with signature patterns, you may find this helpful.  If not, you may ignore this :)

```javascript
suq(String url, Callback( JSON err, JSON json, String body ) callback);
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
### Request options

SUq uses the [request](https://github.com/request/request) library to retrieve the HTML of the given site. The default options may not always be ideal, so you can pass any [options](https://github.com/request/request#requestoptions-callback) to `request()` using an optional third argument to `suq()`. A prominent example is the NYTimes, where you must accept cookies to get to get past the paywall the content.

```javascript
var suq = require('suq');
var url = "http://www.example.com";

suq(url, function (err, json, body) {
    NowDoSomethingCool(json);
}, { jar: true });
```

### Handling requests yourself

If you pass URLs that don't send HTML back, one of the dependencies for SUq will return an error. SUq therefore exposes
it's `parse` function so you can handle these events yourself (in the cases when you don't want to validate the URL
being passed to SUq) like so:

```javascript
var request = require('request');
var suq = require('suq');

request("http://www.example.com/image.jpeg", function (err, res, body) {
  if (err) return callback(err);
  else if (!res || !res.statusCode) return callback(new Error('No response'));
  else if (res.headers['content-type'] !== 'text/html') return callback(null, {}, body);
  else suq.parse(body, callback);
});
```

### Mentions

SUq was made possible by:

* [cheerio by Matt Mueller](https://github.com/cheeriojs/cheerio.git)

* [lodash by John-David Dalton](https://lodash.com/)

* [microdata-node by Jan Potoms](https://github.com/Janpot/microdata-node)

* [microformat-node by Glenn Jones](https://github.com/glennjones/microformat-node#readme)

* [minimist and traverse by James Halliday](https://github.com/substack/minimist)

* [request by Mikeal Rogers](https://github.com/request/request#readme)

* And of course the awesome folks over at nodeJS.org


A huge THANK YOU goes out to all of you for making this easy for me..  :)


### Contributors

- Matt McFarland
- Tom Sutton
- Oscar Illescas
- Gary Moon

### TODOS:

- Add more explanations regarding options


### Changelog

#### v1.3.0
- Backfill unit tests, remove microformat truncation.

#### v1.2.0
- Add new request and documentation for using it.

#### v1.1.0
- Add anchor tag links thanks to Oscar Illescas


#### v1.0.1

- Fixed issue with missing body (only populate data was coming in) thanks Tom Sutton

#### v1.0.0

- Cleaned up Microdata to much more managable state.

- Cleaned up Microformats to much more managable state.

- Cleaned up meta tag scraping

- Reworked Opengraph tag scraping

- Removed options support due to async bugs (may add back in later)

- Added some (not all) XSS protection

- Added trimming/whitespace removal

- Remove options support.

- Fails are graceful, resulting in at least some data returning if an error occurs
