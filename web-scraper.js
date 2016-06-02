var request = require('request'),
    cheerio = require('cheerio');

function webScrapper(url){
    this.url = url;
    this.request = 
};

webScrapper.prototype.requestUrl = function(callback){
    
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