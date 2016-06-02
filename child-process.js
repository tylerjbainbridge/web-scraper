var parsedArgs = require('minimist')(process.argv.slice(2)),
    fs = require('fs'),
    os = require('os');

//var url = parsedArgs.url;

var WebScraper = require('./movie-scraper.js');


function ChildProcess(){}

ChildProcess.prototype.scrape = function(url, callback){
    var webScraper = new WebScraper(url);
    webScraper.requestUrl(function(err, html){
        if(err){
            throw err;
        }else{
            webScraper.getData(html);
            fs.appendFile('./message.txt', JSON.stringify(webScraper.getInfo()) + os.EOL, function (err) {
                callback();
            });
        }
    });
};

module.exports = ChildProcess;