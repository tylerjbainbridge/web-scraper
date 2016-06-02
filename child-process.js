var parsedArgs = require('minimist')(process.argv.slice(2)),
    fs = require('fs');

var url = parsedArgs.url;

var WebScraper = require('./web-scraper.js');
var webScraper = new WebScraper(url);


webScraper.requestUrl(function(err, html){
    if(err){
        throw err;
    }else{
        webScraper.getData(html);
        fs.appendFile('./message.txt', JSON.stringify(webScraper.getInfo()), function (err) {
            
        });
    }
});