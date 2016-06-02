var request = require('request'),
    cheerio = require('cheerio');

function ToplistScraper(){}


ToplistScraper.prototype.scrapeTopList = function(callback) {

    var url = "http://www.imdb.com/chart/top?ref_=nv_mv_250_6";

    request(url, function (err, response, html) {
        if (!err) {
            var $ = cheerio.load(html);

            var newUrlArray = [];
            var tempUrl = "";
            var importUrl = "";
            var homeUrl = "http://www.imdb.com";

            $('.lister-list').filter(function () {

                var data = $(this);
                var allUrls = {};
                
                data.children().find('a').each(function () {

                    tempUrl = $(this).attr('href');
                    importUrl = homeUrl + tempUrl;

                    typeof allUrls[importUrl] == 'undefined'? allUrls[importUrl] = 1 : allUrls[importUrl]++;

                    if(allUrls[importUrl] == 1){
                        newUrlArray.push(importUrl);
                    }
                    
                });

            });
            
            callback(newUrlArray);
        }
    });

};

module.exports = ToplistScraper;
