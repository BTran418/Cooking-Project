'use strict';
/**
 * This script is to be added to the index page only.
 */

let jsonObjects = null;
let loginName = null;

window.onload = function () {

    let request = new XMLHttpRequest();
    request.open('GET', 'script/recipes.json');
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        jsonObjects = request.response; //Create recipe objects from a JSON file.
        console.log(jsonObjects);
        populateTrending();
        document.getElementById('random_recipe').setAttribute('href', 'recipe.html?recipe-id=' + getRandomInt(jsonObjects.length))
    }
}

/**
 * Randomly selects 4 recipes and puts them in the trending area. The media that shows up is always
 * the first one of the body media. 
 */
function populateTrending(){
    let videosDiv = document.getElementById("video");
    let chosenRecipes = [];
    let ids = [];
    //Selects 4 random recipes
    for(let i = 0; i < 4; i++){
        ids.push(getRandomInt(jsonObjects.length));
        console.log(ids);
        let recipe = jsonObjects[ids[i]];
        //TODO: Wait for more than 4 recipes
        // while (findObjectInArray(chosenRecipes, recipe) == -1){
        //     recipe = jsonObjects[getRandomInt(jsonObjects.length)];
        // }

        chosenRecipes.push(recipe);
    }
    // console.log(chosenRecipes)
    // console.log(ids);

    //Get all video containers
    let videoContainers = document.getElementsByClassName('a_video');
    
    for(let i = 0; i < videoContainers.length; i++){
        //Set a href
        videoContainers[i].parentElement.setAttribute('href', 'recipe.html?recipe-id=' + ids[i]);
        //Set name
        videoContainers[i].children[0].children[0].innerText = chosenRecipes[i].title;
        //Set media
        let mediaSource = null;
        if(chosenRecipes[i].media[0].includes('.mp4')){
           mediaSource = 'videos/' + chosenRecipes[i].media[0];
           videoContainers[i].children[1].children[0].children[0].setAttribute('src', mediaSource);
           videoContainers[i].children[1].children[0].children[1].children[0].setAttribute('style','display:none;');
           videoContainers[i].children[1].children[0].children[0].setAttribute('style','');
           videoContainers[i].children[1].children[0].children[0].width = 320;
           videoContainers[i].children[1].children[0].children[0].height = 180;
        }
        else{
           mediaSource = 'photos/' + chosenRecipes[i].media[0];
           videoContainers[i].children[1].children[0].children[1].children[0].setAttribute('src', mediaSource);
           videoContainers[i].children[1].children[0].children[0].setAttribute('style','display:none;');
           videoContainers[i].children[1].children[0].children[1].children[0].setAttribute('style','');
        }
        // videoContainers[i].children[1].children[0].children[0].setAttribute('src', chosenRecipes[i].media[0]);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

function findObjectInArray(array, object){
    for(let i = 0; i < array.length; i++){
        if (object == array[i]){
            return i;
        }
    }
    return -1;
}

function cancelLoginClicked(){
    document.getElementsByClassName("login_part")[0].classList.add('disabled');
}

function loginBtnClicked(){
    document.getElementsByClassName("login_part")[0].classList.remove('disabled');
}

function acceptLoginClicked(){
    login = document.querySelector('.email_login input').value;
    document.getElementsByClassName("login_part")[0].classList.add('disabled');
    document.querySelector('#login').innerText = '@'+login;
    document.querySelector('#login').setAttribute('onclick','');
}