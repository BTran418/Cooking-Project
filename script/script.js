"use strict";
let jsonObjects = null; //All recipe objects

window.onload = function () {
    //Get recipe JSON file
    let request = new XMLHttpRequest();
    request.open('GET', 'script/recipes.json');
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        jsonObjects = request.response; //Create recipe objects from a JSON file.
        // console.log(jsonFile["recipes"][0]);
        // console.log(jsonFile["recipes"][2]["substitutes"]["1"][0]);
        console.log(jsonObjects);
        // recipeManager();
    }
}

function searchByString(string) {

}

function searchByTags(tags) {

}

//Populates the current recipe page.
function recipeManager() {
    let author = document.getElementById("recipe_author");
    let ingredients = document.getElementById("recipe_ingredients");
    let skills = document.getElementById("recipe_skills");
    let body = document.getElementById("recipe_body");

    author.innerText = jsonObjects["recipes"][0].author;
    
    for(let i = 0; i < jsonObjects["recipes"][0].ingredients.length; i++){

        ingredients.innerHTML += jsonObjects["recipes"][0].ingredients[i] + "<br>";
    }
    ingredients.innerHTML += "<br>"

    skills.innerText = jsonObjects["recipes"][0].skills;
    body.innerText = jsonObjects["recipes"][0].bodies[0];
}

function nextBody(){
    let body = document.getElementById("recipe_body");
    let current = parseInt(body.getAttribute("data-current-part"));
    body.innerText = jsonObjects["recipes"][0].bodies[current+1];
    body.setAttribute("data-current-part", current+1);
    
    checkButtonsState(current);
}

function previousBody(){
    let body = document.getElementById("recipe_body");
    let current = parseInt(body.getAttribute("data-current-part"));
    body.innerText = jsonObjects["recipes"][0].bodies[current-1];
    body.setAttribute("data-current-part", current-1);

    checkButtonsState(current);
}

function checkButtonsState(current){
    if(true){

    }
}


/**
 * Populates the recipe website 
 * @param id - Recipe ID
 */
function populateRecipeSite(id){

}