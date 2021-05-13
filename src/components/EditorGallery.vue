<template>
  <div>
    <transition name="slide-fade">
      <EditorTool  v-if="editorLoaded" :src="selectedImageSrc"></EditorTool>
    </transition>

    <div>
      <h1>Editor Gallery</h1>
      <b-row>
        <EditorGalleryImage  :key="url" v-for="url in sources" :src="url" :selected-image="selectedImageSrc" @select="selectImage"></EditorGalleryImage>
      </b-row>
    </div>
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
      editorLoaded: false,
      selectedImageSrc: "",
      src: ls.getImage(window.innerWidth,Math.round(window.innerWidth*0.7) )// Get Images based on viewport width and height
    }
  },
  computed:{
    // viewportWidth: property containing max viewport size, from: https://stackoverflow.com/questions/1248081/how-to-get-the-browser-viewport-dimensions
    viewportWidth() {
      return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    },

    // viewportHeight: property containing max allowed height, based on specified imageWhRatio property
    viewportHeight(){
      return this.viewportWidth * this.imageWhRatio
    },

    sources(){
      return new Array(this.nrOfImages).fill(ls.getImage(this.viewportWidth, this.viewportHeight))
    }
  },
  methods:{
    selectImage(image){
      // console.log("Selecting Image with url: " + image)
      this.selectedImageSrc = image
      this.editorLoaded = true
    }
  },
}

</script>

<style scoped>
.row{
  text-align: center;
  margin: 1em 0
}

  .col-md-4 {
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
</style>