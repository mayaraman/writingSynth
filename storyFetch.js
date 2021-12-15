const maxApi = require('max-api');
var XMLhttprequest = require("xmlhttprequest").XMLHttpRequest;

let xhttp = new XMLhttprequest();

let url = "https://public-api.wordpress.com/rest/v1.1/sites/writingwithmax.wordpress.com/posts/"

maxApi.addHandler('fetchStory', () => {
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
      maxApi.outlet(cleanedContent);


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



