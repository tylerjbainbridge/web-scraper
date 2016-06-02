var express = require('express');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

var app = express();



app.get('/scrape', function(req, res){

    var url = 'http://www.imdb.com/title/tt1431045/';

    //request call
    //url is first param
    //callback takes 3 params
    //--------error
    //--------response status code
    //--------html

    request(url, function(error, request, html){
        //handle request errors

        if(!error){
            //cheerio library on html that is gotten

            var $ = cheerio.load(html);

            //variables we will capture

            var titleBuffer, title, release, rating;
            var json = {
                title: "",
                release: "",
                rating: ""
            };

            $('.title_wrapper').filter(function(){

                //story header class
                var data = $(this);

                titleBuffer = data.children().first().text();


                release = titleBuffer.split('(')
                    .filter(function(v){ return v.indexOf(')') > -1})
                    .map( function(value) {
                        return value.split(')')[0]
                    })[0];

                title = titleBuffer.split('(')[0];

                json.title = title.trim();
                json.release = release;

                console.log(json);

            });

        }
    });






    //where the actual scraping happens
});


app.listen('8081');

console.log('Navigate to port 8081');

exports = module.exports = app;