var exec = require('child_process').exec,
    async = require('async');

var ChildProcess = require('./child-process');
var childprocess = new ChildProcess();

var TopListScraper = require('./toplist-scraper');
var toplistscraper = new TopListScraper();

var startTime = new Date();
toplistscraper.scrapeTopList(function(array){
    var urls = array;

    async.each(urls,childprocess.scrape, function(err){
       console.log(new Date() - startTime); 
    });

});
/*
var urls =['http://www.imdb.com/title/tt0111161/', 'http://www.imdb.com/title/tt0068646/'];

for(var i = 0; i< urls.length ; i++){
    
    (function(i){
        exec('node child-process --url ' + urls[i], (error) => {
            if(error){
                console.log("ERROR");
            }else{
                console.log('done with process: ', i);
            }
        });  
    }(i))
    
}

*/