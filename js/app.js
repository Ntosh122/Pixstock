/**


 */

"use strict";
import { client } from "./api_configure.js";
import { collectionCard } from "./collection_card.js";
import { photoCard } from "./photo_card.js";
import { gridInit,updateGrid } from "./utils/masonry_grid.js";
import { videoCard } from "./video_card.js";


// rendering curated photos in home page
let pageNumber = Math.floor(Math.random() *300) + 1
const $photoGrid = document.querySelector("[data-photo-grid]");

$photoGrid.innerHTML = `<div class="skeleton"></div>`.repeat(18)
client.photos.curated({page: pageNumber, per_page:20}, data =>{
    
    $photoGrid.innerHTML = "";

    const photoGrid = gridInit($photoGrid)
    data.photos.forEach(photo =>{
        const $photoCard = photoCard(photo);

        updateGrid($photoCard, photoGrid.columnsHeight, photoGrid.$columns)
    })
})
// render popular  videos

const $videoGrid = document.querySelector("[data-video-grid]")
$videoGrid.innerHTML = `<div class='skeleton'></div>`.repeat(18)

client.videos.popular({page: pageNumber,per_page: 20}, data =>{
    $videoGrid.innerHTML = ""

    const videoGrid = gridInit($videoGrid);

    data.videos.forEach(video =>{
        const $videoCard = videoCard(video)

        updateGrid($videoCard, videoGrid.columnsHeight, videoGrid.$columns)
    })
})

// render collections
const $collectionGrid = document.querySelector("[data-collection-grid]")
client.collections.featured({ page_page: 18}, data =>{
    data.collections.forEach(collection =>{
        const $collectionCard = collectionCard(collection)

        $collectionGrid.appendChild($collectionCard)
    });
    
})