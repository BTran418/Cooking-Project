/**
 * This script is to be added to the index page only.
 */

let jsonObjects = null;

window.onload = function () {

    let request = new XMLHttpRequest();
    request.open('GET', 'script/recipes.json');
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        jsonObjects = request.response; //Create recipe objects from a JSON file.
        console.log(jsonObjects);
        populateTrending();
    }
}

/**
 * Randomly selects 4 recipes and puts them in the trending area. The media that shows up is always
 * the first one of the body media. 
 */
function populateTrending(){
    let videosDiv = document.getElementById("video");
    let chosenRecipes = [];

    //Selects 4 random recipes
    for(let i = 0; i < 4; i++){
        chosenRecipes.push(jsonObjects[getRandomInt(jsonObjects.length)]);
    }
    //Get all video containers
    let videoContainers = document.getElementsByClassName('a_video');

    for(let i = 0; i < videoContainers.length; i++){
        //Set name
        videoContainers[0].getElementsByClassName('recipe_tile')[0].children[0].innerText = jsonObjects[i].title;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }