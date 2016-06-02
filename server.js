var exec = require('child_process').exec;
var TopListScraper = require('./toplist-scraper');
var toplistscraper = new TopListScraper();

toplistscraper.scrapeTopList(function(array){
    var urls = array;
    for(var i = 0; i< urls.length ; i++){

        exec('node child-process --url ' + urls[i], (error) => {
            if(error){
                console.log("ERROR");
            }else{
                console.log('done with process');
            }
        });

    }
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