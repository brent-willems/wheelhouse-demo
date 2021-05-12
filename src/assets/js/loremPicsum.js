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


    // DEPRECATED:
    //  Async HTTP GET functionality moved to EditorGalleryImage itself

    // let resUrl = ""

    // HTTP Get request to fetch image with the desired parameters
    // XHTTP based:
    //  Synchronous atm for ease of development
    //  TODO: Make async, provide function with callback to fetch resolved URL upon http GET completion
    // let xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function () {
    //     if (this.readyState === 4 && this.status === 200) {
    //         resUrl = this.responseURL
    //     }
    // };
    // xhttp.open("GET", url, false);
    // xhttp.send();


    // Axios based HTTP
    //  Uses Promises, TODO: look into using this if possible --> needs workaround for resolving Promises
    // await axios.default.get(url)
    //     .then((response) => {
    //         //console.log(response.config.url)
    //         //console.log("Response url: "+ response.request.responseURL)
    //         resUrl =  response.request.responseURL
    //     })
    //
    // console.log(resUrl)
    //
    // return resUrl;

    // DEV: Display the completed URL
    //console.log(xhttp.responseURL)
    //return resUrl;
}
