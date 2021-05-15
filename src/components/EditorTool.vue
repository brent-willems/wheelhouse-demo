<template>
  <div class="editor-tool">
    <h2>EditorTool</h2>
    <b-row>
      <b-col md="6">
        <img :src="currentSrc" @load="revokeBlob">
      </b-col>
      <b-col md="6">
        <b-row>
          <b-col md="6">
            <p>Width</p>
            <b-form-input v-model="width" type="range" min="1" :max="origWidth" ></b-form-input>
            <div class="mt-2">{{widthPercentage}}% ({{width}} px)</div>
          </b-col>

          <b-col md="6">
            <p>Height</p>
            <b-form-input v-model="height" type="range" min="1" :max="origHeight"></b-form-input>
            <div class="mt-2">{{heightPercentage}}% ({{height}} px)</div>
          </b-col>
        </b-row>
        <b-row>
          <b-button class="load-button" pill variant="outline-secondary" @click="getEditedData">Crop Img</b-button>
        </b-row>
        <b-button @click="uploadImg">Upload</b-button>
      </b-col>
    </b-row>


  </div>
</template>

<script>
//import lipo from 'lipo'
import axios from 'axios'
import * as ls from '@/assets/js/loremPicsum.js'
import * as blob from '@/assets/js/blobConversion.js'


export default {
  name: "EditorTool",
  props: {
    src: String,
    imgData: Blob,
    origWidth: Number,
    origHeight: Number
  },

  data() {
    return {
      // Image source data
      blobUrl: null,
      currentSrc: this.src,
      bufferData: null,

      // Form input data
      width: this.origWidth,
      height: this.origHeight
    }
  },
  computed:{
    imgId(){
      return ls.toId(this.src)
    },

    // Form computed data
    widthPercentage(){
      return Math.round((this.width / this.origWidth) * 1000) /10
    },
    heightPercentage(){
      return Math.round((this.height / this.origHeight) * 1000) / 10
    }


  },
  methods: {

    // Revokes BlobURL when processed IMG is loaded
    revokeBlob(){
      if(this.blobUrl) URL.revokeObjectURL(this.blobUrl)
    },

    // Upload image to Sharp server:
    //  based on https://stackoverflow.com/questions/47809402/post-image-which-store-as-a-blob-with-axios-vuejs
    async uploadImg() {
      // BASEURL
      let URL = "http://localhost:3000/api/upload/"
      // Form to post
      let formData = new FormData()
      formData.append('id', this.imgId) // add Lorem Picsum ID as id
      formData.append('image', this.imgData) // add raw image as blob

      await axios.post(URL, formData,{
        headers:{
          'Content-Type' : 'multipart/form-data'
        }}).then(response => {console.log('response', response)}) // DEV: log response
    },


    async getEditedData(){
      await axios.get("http://localhost:3000/api/process", {
        params:{
          id: this.imgId,
          width: this.width,
          height: this.height,
        },
        responseType: 'json'
      }).then((response) => {
        console.log("RESPONSE IS: " + response.data.b64data)
        let imageAsBlob = blob.b64toBlob(response.data.b64data, 'image/jpg')
        this.currentSrc = URL.createObjectURL(imageAsBlob)
      })
    }

  },
  // Update EditorTool displayed image when another image is selected in the gallery
  watch: {
    src: {
      immediate: true,
      handler(src) {
        if (!src) return
        this.currentSrc = src
      },
    },
  }
}
</script>

<style scoped>
.editor-tool{
  margin-bottom: 3rem;
}
img{
  max-width: 100%;
}
</style>