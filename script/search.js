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
        // searchByText('oven');
        
    }
}

function searchByText(search){
    results = [];
    let searchResults = [];

    // for(let i = 0; i < jsonObjects.length; i++){
    //     for(let j = 0; j < jsonObjects[i].bodies.length; i++){
    //         if(jsonObjects[i].bodies[j].includes(search)){
    //             searchResults.push(jsonObjects[i]);
    //         }
    //     }
    // }
    for(let i = 0; i < jsonObjects.length; i++){
        if(jsonObjects[i]['description'].includes(search) || jsonObjects[i]['title'].includes(search)){
            searchResults.push(jsonObjects[i]);
        }
    }

    results = searchResults;
}

function searchByTag(){
    results = [];
}

function populateResults(recipe){
    if(document.getElementById('result').children.length != 0){
        for(let i = 0; i < document.getElementById('result').children.length; i++){
            document.getElementById('result').children[i].remove();
        }
    }
    
    let individualResult = document.createElement('div');
    let media = document.createElement('div');
    let mediaSrc = null;
    
    if (recipe.media[0].includes(".mp4")){
        mediaSrc = document.createElement('video');
        mediaSrc.setAttribute('src','videos/' + recipe.media[0]);
    }   
    else{
        mediaSrc = document.createElement('img');
        mediaSrc.setAttribute('src','photos/' + recipe.media[0]);
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

    mediaSrc.setAttribute('width','320');

    description.append(title);
    description.append(text);
    media.append(mediaSrc);
    individualResult.append(media);
    individualResult.append(description);

    document.getElementById('result').append(individualResult);
}

function searchBtnClicked(){
    let search = document.getElementById('search_criteria').value;
    console.log('asdasd');
    if(search == '' || search == null){
        return;
    }

    searchByText(search);
    for(let i = 0; i < results.length; i++){
        populateResults(results[i]);
    }
}