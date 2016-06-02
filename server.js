
var express = require('express'),
    fs = require('fs'),
    request = require('request'),
    cheerio = require('cheerio'),
    parsedArgs = require('minimist')(process.argv.slice(2));

var app = express();

app.get('/scrape', function(req, res){
    var url = parsedArgs.url;
    //var url = 'http://www.imdb.com/title/tt1229340/';

    request(url, function(err, response, html){
        if(!err){
            var $ = cheerio.load(html);

            var title, release, rating;
            var json = {title: "", release: "", rating: ""};

            $('.title_wrapper').filter(function(){
                var data = $(this);
                
                title = data.children().first().text().split('(')[0].trim();
                release = data.children().first().children().first().find('a').text();
                
                json.title = title;
                json.release = release;
                
            });

            $('span[itemprop="ratingValue"]').filter(function(){
                var data = $(this);
                json.rating = data.text();
            });
            
            res.send(json);
        }
    });
});

app.listen('3000');

console.log("listening on port 3000");

exports = module.exports = app;