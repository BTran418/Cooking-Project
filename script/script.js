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
        targetRecipeID = site.substring(site.indexOf("recipe-id=")).split('=')[1];
        // let site = window.location.href;
        // console.log(site.indexOf("recipe-id="));
        // console.log(site.substring(site.indexOf("recipe-id=")).split('=')[1]);
        populateRecipeSite(targetRecipeID);
    }
}

function searchByString(string) {

}

function searchByTags(tags) {

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
    let skillsDiv = document.getElementById("skills");
    let equipmentDiv = document.getElementById("equipment");
    let bodyDiv = document.getElementById("steps");

    titleDiv.innerText = recipeObj.title;
    // authorDiv.innerText = recipeObj.author;
    // descriptionDiv.innerText = recipeObj.description;

    //#region Load areas
    //INGREDIENTS
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
    //SKILLS
    for (let i = 0; i < recipeObj.skills.length; i++) {
        //Create item div.
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("container_item");
        itemDiv.setAttribute("data-id", i);
        //Create text div and assign the text.
        let textDiv = document.createElement("div");
        textDiv.classList.add("item_text");
        textDiv.innerText = recipeObj.skills[i];
        //Add text div to item div.
        itemDiv.append(textDiv);
        //Add to skills div.
        skillsDiv.append(itemDiv)
    }
    //EQUIPMENT
    for (let i = 0; i < recipeObj.equipment.length; i++) {
        //Create item div.
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("container_item");
        itemDiv.setAttribute("data-id", i);
        //Create text div and assign the text.
        let textDiv = document.createElement("div");
        textDiv.classList.add("item_text");
        textDiv.innerText = recipeObj.equipment[i];
        //Add text div to item div.
        itemDiv.append(textDiv);
        //Add to skills div.
        equipmentDiv.append(itemDiv)
    }
    //#endregion

    //Load first body
    bodyDiv.getElementsByClassName("body_zone")[0].children[0].innerText = recipeObj.bodies[0]; //body_text div
    bodyDiv.getElementsByClassName("body_zone")[0].children[0].setAttribute("data-current-step", 0);
    document.getElementById("steps").children[0].setAttribute("data-current-step", 0); //media_zone div

    //Media loading part

    if (getTargetMedia(0).includes(".jpg")) {
        document.getElementById("steps").children[0].children[0].remove(); //Removes current media    
        let img = document.createElement("img");
        img.setAttribute("src", "photos/" + getTargetMedia(0));
        document.getElementById("steps").children[0].append(img);
    }
    else if (getTargetMedia(0).includes(".mp4")) {
        document.getElementById("steps").children[0].children[0].remove(); //Removes current media    
        let video = document.createElement("video");
        let source = document.createElement("source");
        video.append("source");
        source.setAttribute("src", "videos/" + getTargetMedia(0));
        // document.getElementById("steps").children[0].children[0].setAttribute("src", "")
        document.getElementById("steps").children[0].append(video);

    }
    //Set step count nav bar
    document.getElementsByClassName("step_count")[0].innerText = "1/" + recipeObj.bodies.length;
}

function prevButtonClicked(element) {
    let currStep = parseInt(element.getAttribute("data-current-step"));
    //Check if there is more before  the current one    
    if (currStep - 1 <= -1) {
        return;
    }
    else {
        let recipeObj = getRecipeById(targetRecipeID);
        let bodyDiv = document.getElementById("steps");

        currStep--;
        // console.log(currStep);

        element.setAttribute("data-current-step", "" + currStep);
        document.getElementsByClassName("body_nav")[0].children[2].setAttribute("data-current-step", "" + (currStep));
        bodyDiv.getElementsByClassName("body_zone")[0].children[0].innerText = recipeObj.bodies[currStep]; //body_text div
        bodyDiv.getElementsByClassName("body_zone")[0].children[0].setAttribute("data-current-step", currStep);
        document.getElementById("steps").children[0].setAttribute("data-current-step", currStep); //media_zone div
        document.getElementsByClassName("step_count")[0].innerText = (currStep + 1) + "/" + recipeObj.bodies.length;

        //Media loading part

        if (getTargetMedia(currStep).includes(".jpg")) {
            document.getElementById("steps").children[0].children[0].remove(); //Removes current media        
            let img = document.createElement("img");
            img.setAttribute("src", "photos/" + getTargetMedia(currStep));
            document.getElementById("steps").children[0].append(img);
        }
        else if (getTargetMedia(currStep).includes(".mp4")) {
            document.getElementById("steps").children[0].children[0].remove(); //Removes current media        
            let video = document.createElement("video");
            video.controls = true;
            let source = "<source src=\"videos/" + getTargetMedia(currStep) + "\" type=\"video/mp4\">"
            console.log(source);
            video.innerHTML = source;
            document.getElementById("steps").children[0].append(video);
        }
    }
}

function nextButtonClicked(element) {
    let currStep = parseInt(element.getAttribute("data-current-step"));
    //Check if there is more after the current one
    if (currStep + 1 >= getRecipeById(targetRecipeID).bodies.length) {
        return;
    }
    else {
        let recipeObj = getRecipeById(targetRecipeID);
        let bodyDiv = document.getElementById("steps");

        currStep++;
        console.log(currStep);

        element.setAttribute("data-current-step", currStep);
        document.getElementsByClassName("body_nav")[0].children[0].setAttribute("data-current-step", "" + (currStep));
        bodyDiv.getElementsByClassName("body_zone")[0].children[0].innerText = recipeObj.bodies[currStep]; //body_text div
        bodyDiv.getElementsByClassName("body_zone")[0].children[0].setAttribute("data-current-step", currStep);
        document.getElementById("steps").children[0].setAttribute("data-current-step", currStep); //media_zone div
        document.getElementsByClassName("step_count")[0].innerText = (currStep + 1) + "/" + recipeObj.bodies.length;

        //Media loading part
        if (getTargetMedia(currStep).includes(".jpg")) {
            document.getElementById("steps").children[0].children[0].remove(); //Removes current media
            let img = document.createElement("img");
            img.setAttribute("src", "photos/" + getTargetMedia(currStep));
            document.getElementById("steps").children[0].append(img);
        }
        else if (getTargetMedia(currStep).includes(".mp4")) {
            document.getElementById("steps").children[0].children[0].remove(); //Removes current media            
            let video = document.createElement("video"); //Creates video element
            video.controls = true; //Allow it to be paused/played
            let source = "<source src=\"videos/" + getTargetMedia(currStep) + "\" type=\"video/mp4\">" //Create source element
            video.innerHTML = source; //Add source to video
            document.getElementById("steps").children[0].append(video);
        }
    }
}

/**
 * Returns the media for the current body of text. Null if none is found.
 * @param {*} step - body id
 */
function getTargetMedia(step) {
    if (getRecipeById(targetRecipeID).media[step + ""] != null) {
        return getRecipeById(targetRecipeID).media[step + ""];
    }
    else {
        return null;
    }
}
//#region Ingredients Substitution Logic

/**
 * Show substitute divs with the substitutes of that specific element.
 * Creates the substitute div right next to the ingredient if there are 
 * ingredients that can be used as substitute.
 */
function showSubstitutes(element) {
    event.stopPropagation();
    targetIngredientId = element.getAttribute("data-id");
    let substitutesDiv = document.getElementsByClassName("substitutes")[0];
    let position = element.getBoundingClientRect();

    //Same ingredient was clicked
    if (targetIngredientId == substitutesDiv.getAttribute("data-current-id")) {
        if (!substitutesDiv.classList.contains("disabled")) {
            substitutesDiv.classList.add("disabled");
        }
        else { //If the same was clicked as the last time but the substitute menu was disabled.
            substitutesDiv.classList.remove("disabled");
            populateSubstitutes();
        }
    }
    else { //Different ingredient was clicked.
        substitutesDiv.classList.remove("disabled");
        substitutesDiv.setAttribute("data-current-id", targetIngredientId);
        populateSubstitutes();
    }

    //Set substitute window right next to the ingredient
    substitutesDiv.setAttribute("style", "top:" + (position.top + window.scrollY) + "px; left:" + (position.x + element.offsetWidth) + "px;");
    // populateSubstitutes();
}
/**
 * Populates the substitute div with the ingredients related to the target ingredient.
 */
function populateSubstitutes() {
    let substitutesDiv = document.getElementsByClassName("substitutes")[0];
    let substitutesTarget = jsonObjects[targetRecipeID].substitutes['' + targetIngredientId];
    let targetIngredientDiv = document.querySelector(".container_item[data-id=\"" + targetIngredientId + "\"]").children[0];
    let subIndex = -1; //substitute 

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
/**
 * Function called swaps the target ingredient with substitute clicked. 
 * @param {*} element - element clicked on
 */
function substituteClicked(element) {
    // let targetIngredientDiv = document.getElementsByClassName("substitutes")[0].children[targetIngredientId];    
    // console.log(document.querySelector(".container_item[data-id=\""+targetIngredientId+"\"]")); //TODO: Delete after
    let targetIngredientDiv = document.querySelector(".container_item[data-id=\"" + targetIngredientId + "\"]").children[0];

    let newText = element.innerText;
    element.innerText = targetIngredientDiv.innerText;
    targetIngredientDiv.innerText = newText;
}
/**
 * Closes the substitution menu. Should be called whenever the user clicks anything but a new ingredient item.
 */
function disableSubsMenu() {
    if (!document.getElementsByClassName("substitutes")[0].classList.contains("disabled")) {
        document.getElementsByClassName("substitutes")[0].classList.add("disabled");
    }
}

//#endregion