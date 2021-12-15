//Max API + Wordpress
const maxApi = require('max-api');
var XMLhttprequest = require("xmlhttprequest").XMLHttpRequest;

//Sentiment Analysis
var Sentiment = require('sentiment');
var sentiment = new Sentiment();

let xhttp = new XMLhttprequest();


//Wordpress Blog Link
let url = "https://public-api.wordpress.com/rest/v1.1/sites/writingwithmax.wordpress.com/posts/"

maxApi.addHandler('makeRequest', () => {
    xhttp.open('GET', url, true);
    xhttp.send();
})

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText);
       let mostRecentPost = response["posts"][0];
       let rawPostContent = mostRecentPost["content"];
       let cleanedContent = removeTags(rawPostContent);
       
     // maxApi.post(cleanedContent);

      var analysis = sentiment.analyze(cleanedContent);

      var words = analysis['tokens']

      var sentimentScore = analysis['score'];
      var comparativeSentiment = analysis['comparative'];
      var wordCount = words.length;

      var totalWordLength = 0;

      for (let i = 0; i < words.length; i++) {
          var word = words[i];
          var wordLength = word.length;

          totalWordLength += wordLength;      }

       averageWordLength = totalWordLength / wordCount;

      maxApi.outlet(sentimentScore, comparativeSentiment, wordCount, averageWordLength);


    }
}


//Credit: GeeksforGeeks code- https://www.geeksforgeeks.org/how-to-strip-out-html-tags-from-a-string-using-javascript/#:~:text=To%20strip%20out%20all%20the,innerText%20property%20from%20HTML%20DOM.
function removeTags(str) {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();
          
    // Regular expression to identify HTML tags in 
    // the input string. Replacing the identified 
    // HTML tag with a null string.
    return str.replace( /(<([^>]+)>)/ig, '');
}




 
