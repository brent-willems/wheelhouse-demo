<template>
  <div>
    <transition name="slide-fade">
      <EditorTool  v-if="editorLoaded" :src="selectedImageSrc" :img-data="selectedImageData" :origWidth="viewportWidth" :origHeight="viewportHeight"></EditorTool>
    </transition>

    <div>
      <h1>Editor Gallery</h1>
      <b-row>
        <EditorGalleryImage  class="editor-gallery-image" :key="source.id" v-for="source in sources" :src="source.url" :selected-image="selectedImageSrc" @select="selectImage"></EditorGalleryImage>
      </b-row>
    </div>

<!--    Load button to get more images-->
    <b-row>
      <b-col md="4" offset-md="4">
        <b-button class="load-button" pill variant="outline-secondary" v-on:click="loadMoreImages">
          Load More
        </b-button>
      </b-col>
    </b-row>

  </div>

</template>

<script>
import * as ls from '@/assets/js/loremPicsum.js'
import EditorGalleryImage from "@/components/EditorGalleryImage.vue"
import EditorTool from "@/components/EditorTool.vue"

export default {
  name: "EditorGallery",
  components: {
    EditorGalleryImage,
    EditorTool
  },
  props:{
    nrOfImages: {
      type: Number
    },
    imageWhRatio: {
      type: Number
    }
  },
  data(){
    return{
      selectedImageSrc: "",  // ImageSource for Editor component
      selectedImageData: null,
      editorLoaded: false,  // Editor Ready state
      loadedImages: this.nrOfImages
    }
  },
  computed:{
    // viewportWidth: property containing max viewport size, from: https://stackoverflow.com/questions/1248081/how-to-get-the-browser-viewport-dimensions
    viewportWidth() {
      return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    },

    // viewportHeight: property containing max allowed height, based on specified imageWhRatio property
    viewportHeight(){
      return Math.round(this.viewportWidth * this.imageWhRatio) // Need rounding to avoid non-integer values
    },
    currentLoadedImages(){
      return this.sources.length
    },
    sources(){
      // if no images loaded: create new array
      let arr = new Array(this.loadedImages)
        for (let i = 0; i < arr.length; i++) {
          arr[i] = {
            id: i,
            url: ls.getImage(this.viewportWidth, this.viewportHeight)
          };
        }
      return arr
    }
  },
  methods:{
    selectImage(image){
      // console.log("Selecting Image with url: " + image)
      this.selectedImageSrc = image.url
      this.selectedImageData = image.data
      this.editorLoaded = true
    },
    loadMoreImages(){
      this.loadedImages += 3
    }
  },
}

</script>

<style scoped>
.row{
  text-align: center;
  margin: 1em 0
}

.editor-gallery-image{
    margin: 0.5em 0;
    /*flex: 0 0 33.333333%;*/
    /*max-width: 33.333%;*/
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .7s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 10%
}

button{
  width: 100%;
  margin-bottom: 5rem;
}

.load-button{
  background-color: transparent;
  border-color: #0091AD;
  color: #0091AD;
}

.load-button:hover{
  transition: all 0.2s ease;
  background-color: #0091AD;
  border: #0091AD;
  color:#FFFCFF;
}
.load-button:focus{
  box-shadow: none !important;
}

/*.btn-secondary{*/
/*  color: #0091AD;*/
/*}*/

/*button:hover{*/
/*  background-color: #0091AD;*/
/*  transition: background-color 0.1s ease;*/
/*  border-color: #0091AD;*/
/*}*/
/*.btn-secondary:hover{*/
/*  color: #FFFCFF;*/
/*  transition: color 0.1s ease*/
/*}*/

/*button:visited{*/
/*  background-color: transparent;*/
/*  border-color: #0091AD;*/
/*}*/

/*.btn-secondary:visited{*/
/*  color: #0091AD;*/
/*}*/

</style>