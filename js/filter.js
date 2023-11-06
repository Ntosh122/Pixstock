/**
 * 
 * 
 */

"use strict";

import { menu } from "./menu.js";

// filter functionality
export const filter = ($filterWrapper, filterObj, callback) =>{
    const $filterClearBtn = $filterWrapper.querySelector("[data-filter-clear]")

    const $filterValue = $filterWrapper.querySelector("[data-filter-value]")

    const $filterClip = $filterWrapper.querySelector("[data-filter-clip]")

    const $filterColorField = $filterWrapper.querySelector("[data-color-field]")

    const filterKey = $filterWrapper.dataset.filter;

    const newObj = filterObj

    menu($filterWrapper, filterValue=>{
        $filterValue.innerText = filterValue
        $filterClip.classList.add('selected');

        newObj[filterKey] = filterValue;
        callback(newObj) 
    })
    $filterClearBtn.addEventListener('click', () =>{
        $filterClip.classList.remove('selected')
        $filterValue.innerText = $filterValue.dataset.filterValue

        delete newObj[filterKey]
        callback(newObj)
    })

    $filterColorField?.addEventListener('change', function(){
        const filterValue = this.value.toLowerCase();

        $filterValue.innerText = filterValue
        $filterClip.classList.add("selected");

        newObj[filterKey] = filterValue;
        callback(newObj)
    })
} 