var request = require('request'),
    cheerio = require('cheerio');

function WebScraper(url){
    this.url = url;
    this.movieInfo = {
        title: "",
        release: "",
        rating: "",
        MPAA: ""
    };
}

/**
 *
 * callback:
 *
 * (err, html) => {
 *      if(err)
 *          //kill process? handle error?
 *      else
 *          WebScraperInstance.getData(html);
 *          appendtream(WSI.getInfo());
 * }
 *
 *
 * @param callback
 */

WebScraper.prototype.requestUrl = function(callback){

    request(this.url, function(err, response, html){
       if(err){
           callback(err);
       }else{
           callback(err, html);
       }
    });
};




WebScraper.prototype.getData = function(html){
    var $ = cheerio.load(html);
    var obj = this;

    $('span[itemprop="ratingValue"]').filter(function(){
        var data = $(this);
        obj.movieInfo.rating = data.text();
    });


    $('.title_wrapper').filter(function(){
        var data = $(this);

        obj.movieInfo.title = data.children().first().text().split('(')[0].trim();
        obj.movieInfo.release = data.children().first().children().first().find('a').text();


        $('.subtext').filter(function(){

            //subtext under title wrapper header
            //contains rating, hours, genre, full release date
            var data = $(this);

            obj.movieInfo.MPAA = data.children().first().attr('content');

        });

    });


    
    
};

WebScraper.prototype.getInfo = function(){
    return this.movieInfo;
};


module.exports = WebScraper;