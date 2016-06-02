var exec = require('child_process').exec,
    async = require('async');

var ChildProcess = require('./child-process');
var childprocess = new ChildProcess();

var TopListScraper = require('./toplist-scraper');
var toplistscraper = new TopListScraper();

toplistscraper.scrapeTopList(function(array){
    var urls = array;
    console.log(array.length);
    /*for(var i = 0; i< urls.length ; i++){

        exec('node child-process --url ' + urls[i], (error) => {
            if(error){
                console.log(error);
            }else{
                console.log('done with process');
            }
        });

    }*/

    async.eachLimit(urls, 5,childprocess.scrape, function(err){
        
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