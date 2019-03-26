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
        console.log(jsonFile["recipes"][0]);
        recipeManager();
    }
}

function searchByString(string) {

}

function searchByTags(tags) {

}


function recipeManager() {
    console.log("Manager");
    let author = document.getElementById("recipe_author");
    let ingredients = document.getElementById("recipe_ingredients");
    let skills = document.getElementById("recipe_skills");
    let body = document.getElementById("recipe_body");

    author.innerText = jsonFile["recipes"][0].author;
    ingredients.innerText = jsonFile["recipes"][0].ingredients;
    skills.innerText = jsonFile["recipes"][0].skills;
    body.innerText = jsonFile["recipes"][0].bodies[0];
}