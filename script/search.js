'use strict';

let jsonObjects = null;
let results = null;
let searchType = null;
let ids = [];
window.onload = function () {

    let request = new XMLHttpRequest();
    request.open('GET', 'script/recipes.json');
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        jsonObjects = request.response; //Create recipe objects from a JSON file.
        // console.log(jsonObjects);
        // searchByText('oven');
        console.log(jsonObjects[4].tags);

    }
}

function searchByText(search) {
    results = [];
    ids = [];
    let searchResults = [];
    search = search.toLowerCase();

    for (let i = 0; i < jsonObjects.length; i++) {
        if (jsonObjects[i]['description'].toLowerCase().includes(search) || jsonObjects[i]['title'].toLowerCase().includes(search)) {
            searchResults.push(jsonObjects[i]);
            ids.push(i);
        }
    }

    results = searchResults;
    return searchResults;
}

function searchByTag(tagsSearch) {
    results = [];
    ids = [];
    for (let i = 0; i < tagsSearch.length; i++) { //Per tag
        for (let j = 0; j < jsonObjects.length; j++) { //Per Recipe
            for (let x = 0; x < jsonObjects[j]['tags'].length; x++) {
                if (jsonObjects[j].tags[x].toLowerCase() == tagsSearch[i].toLowerCase()) {
                    results.push(jsonObjects[j]);
                    ids.push(j);
                }
            }
        }
    }
}

function populateResults(recipe, id) {


    let individualResult = document.createElement('div');
    let media = document.createElement('div');
    let mediaSrc = null;

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

    document.getElementById('result').append(individualResult);
}

function searchBtnClicked() {

    //Remove previous results
    if (document.getElementById('result').children.length != 0) {
        while(document.getElementById('result').children.length != 0){
            document.getElementById('result').children[0].remove();
        }
        // for (let i = 0; i < document.getElementById('result').children.length; i++) {
        //     document.getElementById('result').children[i].remove();
        // }
    }

    let searchType = document.querySelector('.search_type.active');
    //Searcg by text
    if (searchType.innerText == 'Text') {
        //Dont do anything if the search box is empty.
        let search = document.getElementById('search_criteria').value;
        if (search == '' || search == null) {
            return;
        }
        console.log(searchByText(search));
        
        // for (let i = 0; i < results.length; i++) {
        //     populateResults(results[i]);
        // }
    }
    //Search by tags
    else if (searchType.innerText == 'Tags') {
        let activeTagsDiv = document.querySelectorAll('.tag.active');
        let temp = [];
        for(let i = 0; i < activeTagsDiv.length; i++){
            temp.push(activeTagsDiv[i].innerText);
        }
        console.log(searchByTag(temp));
    }
    for (let i = 0; i < results.length; i++) {
        populateResults(results[i], ids[i]);
    }
    // searchByText(search);


}

/**
 * Used to change the .active element and update the search type.
 */
function criteriaClicked(element) {
    let active = document.querySelector('.search_type.active');
    if (active == null) {
        element.classList.add('active');
    }
    else {
        active.classList.remove('active');
        element.classList.add('active');
    }

    //Change elements
    let textSearch = '<input type="text" name="search_box" id="search_criteria">' +
        '<input class="btn" type="button" value="Search" onclick="searchBtnClicked()">';
    let tagSearch = '<div class=\'tag_search\'>' + 
        '<div class=\'tag_collection\'>' +
        '<div class=\'tag\' onclick="tagClicked(this)">Cheese</div>' +
        '<div class=\'tag\' onclick="tagClicked(this)">Original Recipe</div>' +
        '<div class=\'tag\' onclick="tagClicked(this)">Quick</div>' +
        '<div class=\'tag\' onclick="tagClicked(this)">10 People</div>' +
        '<div class=\'tag\' onclick="tagClicked(this)">Dinner</div>' +
        '<div class=\'tag\' onclick="tagClicked(this)">Breakfast</div>' +
        '<div class=\'tag\' onclick="tagClicked(this)">Brunch</div>' +
        '</div>' + //TAG_COLLECTION CLOSE
        '<input id="tag_filter" type="text" placeholder="Filter Tags"></input>' +
        '</div>'; //TAG_SEARCH CLOSE
        // '<input class="btn" type="button" value="Search" onclick="searchBtnClicked()">';


    if (element.innerText.includes('Text')) {
        document.getElementsByClassName('context_search')[0].innerHTML = textSearch;
    }
    else {
        document.getElementsByClassName('context_search')[0].innerHTML = tagSearch;
    }
}

function tagClicked(element) {
    if (element.classList.contains('active')) {
        element.classList.remove('active');
    }
    else {
        element.classList.add('active');
    }
}