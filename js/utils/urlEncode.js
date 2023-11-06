/**
* 
* 
*/

"use strict";
// convert object to url
export  const urlEncode = urlObj =>{
    return Object.entries(urlObj).join("&").replace(/,/g, "=").replace(/#/g, "%23")
}