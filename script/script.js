"use strict";
let jsonFile = null;

window.onload = function () {
    //Get recipe JSON file
    let request = new XMLHttpRequest();
    request.open('GET', 'script/recipes.json');
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        jsonFile = request.response;
        // console.log(jsonFile["recipes"][0]);
        // console.log(jsonFile["recipes"][2]["substitutes"]["1"][0]);
        console.log(jsonFile["recipes"][0].ingredients);
        recipeManager();
    }
}

function searchByString(string) {

}

function searchByTags(tags) {

}


function recipeManager() {
    let author = document.getElementById("recipe_author");
    let ingredients = document.getElementById("recipe_ingredients");
    let skills = document.getElementById("recipe_skills");
    let body = document.getElementById("recipe_body");

    author.innerText = jsonFile["recipes"][0].author;
    
    for(let i = 0; i < jsonFile["recipes"][0].ingredients.length; i++){

        ingredients.innerHTML += jsonFile["recipes"][0].ingredients[i] + "<br>";
    }
    ingredients.innerHTML += "<br>"

    skills.innerText = jsonFile["recipes"][0].skills;
    body.innerText = jsonFile["recipes"][0].bodies[0];
}

function nextBody(){
    let body = document.getElementById("recipe_body");
    body.innerText = jsonFile["recipes"][0].bodies[current+1];
    body.setAttribute("data-current-part", current+1);
}

