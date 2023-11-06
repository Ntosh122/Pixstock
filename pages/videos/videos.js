/**
 * 
 * 
 */

"use strict";

import { client } from "../../js/api_configure.js";
import { filter } from "../../js/filter.js";
import { videoCard } from "../../js/video_card.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { updateUrl } from "../../js/utils/updateUrl.js";
import { urlDecode } from "../../js/utils/urlDecode.js";


// show filter bar if searched for anything
const $filterBar = document.querySelector("[data-filter-bar]")
let pageNumber = Math.floor(Math.random() *300) + 1

$filterBar.style.display = window.location.search ? "flex" : "none";

// filter
const $filterWrappers = document.querySelectorAll("[data-filter]")
$filterWrappers.forEach($filterWrapper =>{
    filter($filterWrapper, window.filterObj, (newObj) =>{
        window.filterObj = newObj;
        updateUrl(newObj, "videos")
    });
})

// render curated and searched photos

const $videoGrid = document.querySelector("[data-video-grid]")
const  $title = document.querySelector("[data-title]")
const videoGrid = gridInit($videoGrid);
const perPage = 30;
let currentPage = pageNumber;
let totalPage = 0;
const searchUrl = window.location.search.slice(1);
let searchObj = searchUrl && urlDecode(searchUrl)

const title = searchObj ? `${searchObj.query} videos` : "Popular videos"

$title.textContent = title;
document.title = title;

// Render all photos
const renderVideos = function(currentPage){
    client.videos[searchObj ? "search" : "popular"]({...searchObj, per_page:perPage, page:currentPage}, data =>{
        totalPage = Math.ceil(data.total_results / perPage)

        data.videos.forEach(elem => {
            const $videoCard = videoCard(elem)

            updateGrid($videoCard, videoGrid.columnsHeight, videoGrid.$columns)
        });
        // when photo loaded
        isLoad = true
        // when no photo found, hide loader
        if(currentPage >= totalPage){
            $loader.style.display='none'
            $videoGrid.innerHTML = `<p>We couldn’t find anything for "${searchObj.query}". Try to refine your search</p>`;
            $videoGrid.style.fontSize = '2rem'
            $videoGrid.style.fontWeight='400'
            
        }
        
    })
}
renderVideos(currentPage)

// load more pictures
const $loader = document.querySelector("[data-loader]")
let isLoad = true;

window.addEventListener("scroll", function(){
   
    if( $loader.getBoundingClientRect().top < (window.innerHeight *2) && currentPage <= totalPage && isLoad){
        currentPage++; //INCREMENT AT A SCROLL
        renderVideos(currentPage)
        isLoad=false
    }
})