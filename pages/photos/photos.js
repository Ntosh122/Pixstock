/**
 * 
 * 
 */

"use strict";

import { client } from "../../js/api_configure.js";
import { filter } from "../../js/filter.js";
import { photoCard } from "../../js/photo_card.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { updateUrl } from "../../js/utils/updateUrl.js";
import { urlDecode } from "../../js/utils/urlDecode.js";

let pageNumber = Math.floor(Math.random() * 100) + 1

// show filter bar if searched for anything
const $filterBar = document.querySelector("[data-filter-bar]")


$filterBar.style.display = window.location.search ? "flex" : "none";

// filter
const $filterWrappers = document.querySelectorAll("[data-filter]")
$filterWrappers.forEach($filterWrapper =>{
    filter($filterWrapper, window.filterObj, (newObj) =>{
        window.filterObj = newObj;
        updateUrl(newObj, "photos")
    });
})

// render curated and searched photos

const $photoGrid = document.querySelector("[data-photo-grid]")
const  $title = document.querySelector("[data-title]")
const photoGrid = gridInit($photoGrid);
const perPage = 30;
let currentPage = pageNumber;
let totalPage = 0;
const searchUrl = window.location.search.slice(1);
let searchObj = searchUrl && urlDecode(searchUrl)

const title = searchObj ? `${searchObj.query} photos` : "Curated photos"

$title.textContent = title;
document.title = title;

// Render all photos
const renderPhotos = function(currentPage){
    client.photos[searchObj ? "search" : "curated"]({...searchObj, per_page:perPage, page:currentPage}, data =>{
        totalPage = Math.ceil(data.total_results / perPage)

        data.photos.forEach(elem => {
            const $photoCard = photoCard(elem)

            updateGrid($photoCard, photoGrid.columnsHeight, photoGrid.$columns)
        });
        // when photo loaded
        isLoad = true
        // when no photo found, hide loader
        if(currentPage >= totalPage){
            $loader.style.display='none'
            $photoGrid.innerHTML = `<p>We couldn’t find anything for "${searchObj.query}". Try to refine your search</p>`;
            $photoGrid.style.fontSize = '2rem'
            $photoGrid.style.fontWeight='400'
            
        }
        
    })
}
renderPhotos(currentPage)

// load more pictures
const $loader = document.querySelector("[data-loader]")
let isLoad = true;

window.addEventListener("scroll", function(){
   
    if( $loader.getBoundingClientRect().top < (window.innerHeight *2) && currentPage <= totalPage && isLoad){
        currentPage++; //INCREMENT AT A SCROLL
        renderPhotos(currentPage)
        isLoad=false
    }
})