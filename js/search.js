"use strict";
import {ripple} from './utils/ripple.js'
 import {addEventOnElements} from  './utils/event.js'
import { segment } from './segment_btn.js';
import { updateUrl } from './utils/updateUrl.js';

 const $searchTogglers = document.querySelectorAll("[data-search-toggler]")
 const $searchView = document.querySelector("[data-search-view]")

 addEventOnElements($searchTogglers, "click", () => $searchView.classList.toggle("show"))

//  SEARCH CLEAR
const $searchField = document.querySelector("[data-search-field]")

const $searchClearBtn = document.querySelector("[data-search-clear-btn]")

$searchClearBtn.addEventListener("click", () => $searchField.value= "")


// search type

const $searchSegment = document.querySelector("[data-segment='search']")
const $activeSegmentBtn = $searchSegment.querySelector("[data-segment-btn].selected")

window.searchType = $activeSegmentBtn.dataset.segmentValue

segment($searchSegment, segmentValue => window.searchType = segmentValue)

// search submit
const $searchBtn = document.querySelector("[data-search-btn]")

$searchBtn.addEventListener("click", function(){
    const searchValue = $searchField.value.trim();

    if(searchValue){
        updateSearchHistory(searchValue)
        window.filterObj.query = searchValue
        updateUrl(window.filterObj, window.searchType)
    }
})

// Submit search when press "Enter" key

$searchField.addEventListener("keydown", evt =>{
    if(evt.key=== "Enter" && $searchField.value.trim()){
        $searchBtn.click()
    }
});

// initial search history
let searchHistory = {
    items:[]
}
if(window.localStorage.getItem("search_history")){
    searchHistory = JSON.parse(window.localStorage.getItem("search_history"))
}else{
    window.localStorage.setItem("search_history", JSON.stringify(searchHistory))
}
// Search History

const updateSearchHistory = searchValue =>{
    if(searchHistory.items.includes(searchValue)){
        searchHistory.items.splice(searchHistory.items.indexOf(searchValue), 1)
    }

    searchHistory.items.unshift(searchValue)

    window.localStorage.setItem("search_history", JSON.stringify(searchHistory))
}

// Rendering search history in search list

const $searchList = document.querySelector("[data-search-list]");
const historyLen = searchHistory.items.length

for (let x = 0; x < historyLen & x<=5; x++) {
    const $listItem = document.createElement("button")
    $listItem.classList.add("list-item")

    $listItem.innerHTML =  `
    <span class="material-symbols-outlined leading-icon" aria-hidden="true">history</span>
    <span class="body-large text">${searchHistory.items[x]}</span>

    <div class="state-layer"></div>
    `

    ripple($listItem)
    
    $listItem.addEventListener("click", function(){
        $searchField.value = this.children[1].textContent
        $searchBtn.click()
    })
    $searchList.appendChild($listItem)
}