'use strict';

let jsonObjects = null;
let results = null;

window.onload = function () {

    let request = new XMLHttpRequest();
    request.open('GET', 'script/recipes.json');
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        jsonObjects = request.response; //Create recipe objects from a JSON file.
        // console.log(jsonObjects);
        searchByText('oven');
    }
}

function searchByText(search){
    results = [];
    let searchResults = [];

    for(let i = 0; i < jsonObjects.length; i++){
        for(let j = 0; j < jsonObjects[i].bodies.length; i++){
            if(jsonObjects[i].bodies[j].includes(search)){
                searchResults.push(jsonObjects[i]);
            }
        }
    }
    for(let i = 0; i < jsonObjects.length; i++){
        if(jsonObjects[i]['description'].includes(search)){
            searchResults.push(jsonObjects[i]);
        }
    }

    results = searchResults;
}

function searchByTag(){

}

function populateResults(recipe){
    let individualResult = document.createElement('div');
    let media = document.createElement('div');
    let mediaSrc = null;
    
    if (recipe.media[0].includes(".mp4")){
        mediaSrc = document.createElement('video');
    }   
    else{
        mediaSrc = document.createElement('img');
    }

    let description = document.createElement('div');
    let title = document.createElement('div');
    let text = document.createElement('div');
}