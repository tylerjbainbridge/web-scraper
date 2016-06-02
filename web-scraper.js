var request = require('request'),
    cheerio = require('cheerio');

function WebScrapper(url){
    this.url = url;
    this.request = request;
    this.movieInfo = {
        title: "",
        release: "",
        rating: ""
    };
}

WebScrapper.prototype.requestUrl = function(callback){
    this.request(this.url, function(err, response, html){
       if(err){
           callback(err);
       }else{
           callback(err, html);
       }
    });
};

WebScrapper.prototype.getData = function(callback){
    var $ = cheerio.load(html);
    var that = this;

    $('.title_wrapper').filter(function(){
        var data = $(this);

        that.movieInfo.title = data.children().first().text().split('(')[0].trim();
        that.movieInfo.release = data.children().first().children().first().find('a').text();

    });

    $('span[itemprop="ratingValue"]').filter(function(){
        var data = $(this);
        that.movieInfo.rating = data.text();
    });
    
    
};

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
    }
});

module.exports = WebScrapper;