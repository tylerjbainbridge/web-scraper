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


                release = data.children().first().children().first().find('a').text();

                title = titleBuffer.split('(')[0];

                json.title = title.trim();
                json.release = release;

                $('.subtext').filter(function(){

                    //subtext under title wrapper header
                    //contains rating, hours, genre, full release date
                    var data = $(this);


                    json.rating = data.children().first().attr('content');

                });






            });



            console.log(json);

        }
    });






    //where the actual scraping happens
});


app.listen('8081');

console.log('Navigate to port 8081');

exports = module.exports = app;