'use strict';

let jsonObjects = null;
// let results = null;
// let searchType = null;
// let ids = [];
window.onload = function () {

    let request = new XMLHttpRequest();
    request.open('GET', 'script/recipes.json');
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        jsonObjects = request.response; //Create recipe objects from a JSON file.
        // console.log(jsonObjects);
        // searchByText('oven');
        // console.log(jsonObjects[4].tags);

        for(let i = 0; i < jsonObjects.length; i++){
            populateResults(jsonObjects[i], i);
        }

    }
}

function populateResults(recipe, id) {


    let individualResult = document.createElement('div');
    let media = document.createElement('div');
    let mediaSrc = null;

    // console.log(recipe.media);

    if (recipe.media[0].includes(".mp4")) {
        mediaSrc = document.createElement('video');
        mediaSrc.setAttribute('src', 'videos/' + recipe.media[0]);
        mediaSrc.controls = true;

    }
    else {
        mediaSrc = document.createElement('img');
        mediaSrc.setAttribute('src', 'photos/' + recipe.media[0]);
    }

    let description = document.createElement('div');
    let title = document.createElement('div');
    let text = document.createElement('div');

    title.innerText = recipe.title;
    text.innerText = recipe.description;

    individualResult.classList.add('individual_result');
    media.classList.add('media');
    description.classList.add('description');
    title.classList.add('recipe_title');
    text.classList.add('recipe_text');

    mediaSrc.setAttribute('width', '320');
    mediaSrc.setAttribute('height', '180');

    let aTitle = document.createElement('a');
    aTitle.setAttribute('href','recipe.html?recipe-id='+ id);
    aTitle.append(title);
    description.append(aTitle);

    description.append(text);
    media.append(mediaSrc);
    individualResult.append(media);
    individualResult.append(description);

    document.getElementById('all_recipes').append(individualResult);
}