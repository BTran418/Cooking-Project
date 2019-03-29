"use strict";
let jsonObjects = null; //All recipe objects
let targetIngredientId = null;
let targetRecipeID = 0;

// window.addEvent('scroll', updateSubstitutePosition());
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
        // console.log(jsonObjects);
        // recipeManager();
        populateRecipeSite(targetRecipeID);
    }
}

function searchByString(string) {

}

function searchByTags(tags) {

}

//Populates the current recipe page.
// function recipeManager() {
//     let author = document.getElementById("recipe_author");
//     let ingredients = document.getElementById("recipe_ingredients");
//     let skills = document.getElementById("recipe_skills");
//     let body = document.getElementById("recipe_body");

//     author.innerText = jsonObjects["recipes"][0].author;

//     for(let i = 0; i < jsonObjects["recipes"][0].ingredients.length; i++){

//         ingredients.innerHTML += jsonObjects["recipes"][0].ingredients[i] + "<br>";
//     }
//     ingredients.innerHTML += "<br>"

//     skills.innerText = jsonObjects["recipes"][0].skills;
//     body.innerText = jsonObjects["recipes"][0].bodies[0];
// }

/**
 * Populates with the next body.
 */
function nextBody() {
    let body = document.getElementById("recipe_body");
    let current = parseInt(body.getAttribute("data-current-part"));
    body.innerText = jsonObjects["recipes"][0].bodies[current + 1];
    body.setAttribute("data-current-part", current + 1);

    checkButtonsState(current);
}

function previousBody() {
    let body = document.getElementById("recipe_body");
    let current = parseInt(body.getAttribute("data-current-part"));
    body.innerText = jsonObjects["recipes"][0].bodies[current - 1];
    body.setAttribute("data-current-part", current - 1);

    checkButtonsState(current);
}

function checkButtonsState(current) {
    if (true) {

    }
}

/**
 * Returns specific recipe object.
 * @param id - Target recipe ID
 */
function getRecipeById(id) {
    return jsonObjects[id];
}

/**
 * Populates the recipe website. Creates divs as necessary.
 * @param id - Recipe ID
 */
function populateRecipeSite(id) {
    let recipeObj = getRecipeById(id);
    //TODO: Fill the getters
    let titleDiv = document.getElementsByClassName("recipe_title_text")[0];
    // let authorDiv = document.getElementById();
    // let descriptionDiv = document.getElementById();
    let ingredientsDiv = document.getElementById("ingredients");
    // let substitutesDiv = document.getElementById();
    // let skillsDiv = document.getElementById();
    // let equipmentDiv = document.getElementById();
    // let bodyDiv = document.getElementById();

    titleDiv.innerText = recipeObj.title;
    // authorDiv.innerText = recipeObj.author;
    // descriptionDiv.innerText = recipeObj.description;

    //Create divs for each ingredient.
    for (let i = 0; i < recipeObj.ingredients.length; i++) {
        //Create item div.
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("container_item");
        itemDiv.setAttribute("onclick", "showSubstitutes(this)");
        itemDiv.setAttribute("data-id", i);
        //Create text div and assign the text.
        let textDiv = document.createElement("div");
        textDiv.classList.add("item_text");
        textDiv.innerText = recipeObj.ingredients[i];
        //Add text div to item div.
        itemDiv.append(textDiv);
        //Add to ingredients div.
        ingredientsDiv.append(itemDiv);
    }
}

/**
 * Show substitute divs with the substitutes of that specific element.
 * Creates the substitute div right next to the ingredient if there are 
 * ingredients that can be used as substitute.
 */
function showSubstitutes(element) {
    targetIngredientId = element.getAttribute("data-id");
    let substitutesDiv = document.getElementsByClassName("substitutes")[0];
    let position = element.getBoundingClientRect();

    if (substitutesDiv.classList.contains("disabled")) {
        substitutesDiv.classList.remove("disabled");
    }
    //Set window right next to the ingredient
    substitutesDiv.setAttribute("style", "top:" + (position.top + window.scrollY) + "px; left:" + (position.x + element.offsetWidth) + "px;");
    // console.log(populateSubstitutes());
    populateSubstitutes();
}
/**
 * Populates the substitute div with the ingredients related to the target ingredient.
 */
function populateSubstitutes() {
    let substitutesDiv = document.getElementsByClassName("substitutes")[0];
    let substitutesTarget = jsonObjects[targetRecipeID].substitutes['' + targetIngredientId];
    let targetIngredientDiv = document.querySelector(".container_item[data-id=\"" + targetIngredientId + "\"]").children[0];
    let subIndex = -1; //substitute 

    // console.log(jsonObjects[targetRecipeID].substitutes['' + targetIngredientId]);



    // Delete previous ingredients if any
    if (substitutesDiv.children.length > 1) {
        while (substitutesDiv.children.length != 1) {
            substitutesDiv.children[1].remove();
        }
    }

    if (substitutesTarget != null) {
        //Check if it was already substituted
        for (let i = 0; i < substitutesTarget.length; i++) {
            if (substitutesTarget[i] == targetIngredientDiv.innerText) {
                subIndex = i;
                console.log("Subindex: " + subIndex);
            }
        }
        //Adds matching ingredients
        // console.log("Found substitution");
        for (let i = 0; i < substitutesTarget.length; i++) {
            let itemDiv = document.createElement("div");
            
            itemDiv.classList.add("substitute_item");

            if (subIndex == i) {
                itemDiv.innerText = getRecipeById(targetRecipeID).ingredients[targetIngredientId];
                console.log(substitutesTarget[i] + " -> " + getRecipeById(targetRecipeID).ingredients[targetIngredientId]);
            }
            else {
                itemDiv.innerText = substitutesTarget[i];
            }
            
            itemDiv.setAttribute("onclick", "substituteClicked(this)")
            substitutesDiv.append(itemDiv);
        }
    }
    else {
        let itemDiv = document.createElement("div");
        itemDiv.innerText = "None found :(";
        substitutesDiv.append(itemDiv);
    }
}

function substituteClicked(element) {
    // let targetIngredientDiv = document.getElementsByClassName("substitutes")[0].children[targetIngredientId];    
    // console.log(document.querySelector(".container_item[data-id=\""+targetIngredientId+"\"]")); //TODO: Delete after
    let targetIngredientDiv = document.querySelector(".container_item[data-id=\"" + targetIngredientId + "\"]").children[0];

    let newText = element.innerText;
    element.innerText = targetIngredientDiv.innerText;
    targetIngredientDiv.innerText = newText;
}