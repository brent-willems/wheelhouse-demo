<template>
  <b-col md="4">
    <div v-if="!resUrl" class="d-flex justify-content-center align-items-center text-center h-100">
      <b-spinner type="grow" label="Loading..."></b-spinner>
    </div>

    <img :class="{'selectedImg': isSelected}" v-if="resUrl" v-on:click="onClickImage" ref="image" :src="resUrl" @load="loaded" alt="" :style="style"/>
  </b-col>
</template>

<script>

// EditorGalleryImage async image loading:
// adapted from: https://gist.github.com/nebaughman/6af3d7fadbbbd1f641188079a545ae00

import axios from "axios"
/**
 * Load image url from LoremPicsum
 */
async function load(src) {
  const config = { url: src, method: "get", responseType: "blob" }
  const response = await axios.request(config)
  //return response.data // the blob
  return {// get the ResponseUrl
    respUrl: response.request.responseURL,
    data: response.data
  };
}
/**
 * Loads the image dynamically (asynchronously)
 * Set the img tag's src to the response url.
 */
export default {
  name: "EditorGalleryImage",
  props: {
    selectedImage: {
      type: String
    },
    src: {
      type: String,
    },
  },
  data() {
    return {
      resUrl: "",
      rawData: null,
      style: "",
    }
  },
  computed: {
    isSelected(){
      return this.selectedImage === this.resUrl  // Image is considered selected when its own url matches the 'selectedImgUrl' passed down from the EditorGallery component
    }
  },
  methods: {
    onClickImage(){
      this.$emit('select', {url: this.resUrl, data: this.rawData})
    },
    loaded() {
      // this.onClickImage = function(){
      //   this.$emit('clicked', this.resUrl)
      // }
    },

  },
  watch: {
    src: {
      immediate: true,
      handler(src) {
        if (!src) return
        // load(src).then(blob => {
        //  this.blobUrl = URL.createObjectURL(blob)
        // })
        load(src).then(result => {
          //console.log("Responseurl = " + result)
          this.resUrl = result.respUrl; // pass ResultUrl to image src attribute
          this.rawData = result.data;
        })
      },
    },
  },
}
</script>

<style scoped>
img{
  max-width: 100%;
  max-height: 18rem;  /*Limit height to ensure*/
  border: 4px solid transparent;
}

img:hover:not(.selectedImg){
  border: 4px solid #77867F;
  transition: border ease-in 150ms;
}
.spinner-grow{
  color: #0091AD;
}

.selectedImg{
  border: 4px solid #0091AD;
  transition: border ease-in 150ms;
}
</style>