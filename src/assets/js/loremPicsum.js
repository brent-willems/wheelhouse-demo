// Lorem Picsum API wrapper function
//  API URL https://picsum.photos/

//import * as axios from 'axios'

// Default Parameters
const DEFAULT_WIDTH = 500;
const DEFAULT_HEIGHT = 300;

/**
 * getImage
 *  Wrapper function which fetches an image using the LorumPicsum API
 *
 * @param id the id of the img HTML el to load the picture into
 * @param width the desired width of the image
 * @param height the desired height of the image
 * @param seed any kind of value used by the API to request a static image
 * @param modifiers MUST BE AN ARRAY, containing either or 'grayscale', 'blur' or both
 *
 * @return String containing the request URL of the Lorem Picsum API
 */

export function getImage(width, height, seed, modifiers) {
    let baseUrl = "https://picsum.photos/"
    let url = baseUrl;

    // Modify url based on passed parameters
    // add a seed to the request url
    if (seed) {
        url = baseUrl + "seed/" + seed + "/";
    }
    // add a specified width and height to the request url
    if (width && height) {
        url = url + width + "/" + height;
    } else {
        url = url + DEFAULT_WIDTH + "/" + DEFAULT_HEIGHT;
    }

    // add modifiers like blur and grayscale to the url
    if (modifiers) {
        url = url + "?"
        modifiers.forEach(e => {
            url = url + e + "&"
        })
    }
    return url
}

// Code to map a LoremPicsum full URL to its unique ID
//  format of LormemPicsum response URL: https://i.picsum.photos/id/ ID / WIDTH / HEIGHT .jpg ?OTHER_DATA
export function toId(fullUrl) {
    let baseUrl = "https://i.picsum.photos/id/" // Base loremPicsum ID url
    return fullUrl.substr(baseUrl.length).split("/")[0]  // Remove the baseUrl, then split the url and get the first part, namely the unique LoremPicsum ID
}

