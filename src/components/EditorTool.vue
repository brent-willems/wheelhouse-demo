<template>
  <div class="editor-tool">
    <h2>EditorTool</h2>
    <b-overlay :show="!imageReady">
      <b-row class="image-row">
        <b-col class="image-col" align-self="center" lg="7">
          <img class="disabled" v-if="imageReady" :src="currentSrc">
        </b-col>
        <b-col lg="5">
          <b-row class="editor-row" align-v="center">
            <b-col lg="5">
              <p>Width</p>
              <b-form-input v-model="width" type="range" min="1" :max="origWidth" ></b-form-input>
              <div class="mt-2">{{widthPercentage}}% ({{width}} px)</div>
            </b-col>

            <b-col lg="5">
              <p>Height</p>
              <b-form-input v-model="height" type="range" min="1" :max="origHeight"></b-form-input>
              <div class="mt-2">{{heightPercentage}}% ({{height}} px)</div>
            </b-col>

            <b-col lg="2">
              <b-button class="load-button" pill @click="resizeImage">Resize</b-button>
            </b-col>
          </b-row>
          <b-row align-v="center">
            <b-col lg="10">
              <p>Transparency</p>
              <b-form-input v-model="transparency" type="range" min="0" :max="100" ></b-form-input>
              <div class="mt-2">{{transparency}}%</div>
            </b-col>

            <b-col lg="2">
              <b-button class="load-button" pill @click="alpha">Alpha</b-button>
            </b-col>
          </b-row>
          <b-row>
            <b-col offset-lg="5" lg="2">
              <b-button class="load-button" pill @click="downloadFile">Download</b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-overlay>

  </div>
</template>

<script>
//import lipo from 'lipo'
import axios from 'axios'
import {saveAs} from 'file-saver'
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

      // Image ready for edit (uploaded to server)
      imageReady: false,

      // Form input data
      width: this.origWidth,
      height: this.origHeight,

      transparency: 100
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

    // UpdateImg
    updateImg(bufferedImg, imgType){
      // Revokes old blob
      if(this.blobUrl) {
        URL.revokeObjectURL(this.blobUrl)
        // console.log("BlobUrl revoked")
      }

      let imageAsBlob = blob.b64toBlob(bufferedImg, imgType)
      this.blobUrl = URL.createObjectURL(imageAsBlob)
      this.currentSrc = this.blobUrl

    },
    // Revokes BlobURL when processed IMG is loaded
    // revokeBlob(){
    //   // console.log("BlobUrl = " + this.blobUrl)
    //   if(this.blobUrl) {
    //     URL.revokeObjectURL(this.blobUrl)
    //     // console.log("BlobUrl revoked")
    //   }
    // },

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
        }}).then(() => {
        setTimeout(()=>{this.imageReady = true}, 250)
      }) // DEV: log response
    },

    //-- Image Processing functionality --//

    // Resize Image
    async resizeImage(){
      await axios.get("http://localhost:3000/api/process/resize", {
        params:{
          id: this.imgId,
          width: this.width,
          height: this.height,
        },
        responseType: 'json'
      }).then((response) => {
        this.updateImg(response.data.b64data, response.data.contentType)
        // let imageAsBlob = blob.b64toBlob(response.data.b64data, response.data.contentType)
        // this.blobUrl = URL.createObjectURL(imageAsBlob)
        // this.currentSrc = this.blobUrl
      })
    },

    async alpha() {
      await axios.get("http://localhost:3000/api/process/alpha", {
        params: {
          id: this.imgId,
          alpha: this.transparency
        },
        responseType: 'json'
      }).then((response) => {
        this.updateImg(response.data.b64data, response.data.contentType)
        // let imageAsBlob = blob.b64toBlob(response.data.b64data, response.data.contentType)
        // this.blobUrl = URL.createObjectURL(imageAsBlob)
        // this.currentSrc = this.blobUrl
      })
    },
    downloadFile(){
       saveAs(this.blobUrl, String("edited-lorempicsum-" + this.imgId))
    }

  },
  // Update EditorTool displayed image when another image is selected in the gallery
  watch: {
    src: {
      immediate: true,
      handler(src) {
        if (!src) {
          return
        } else {
          this.imageReady = false
          this.currentSrc = src
          this.uploadImg()
        }

      },
    },
  }
}
</script>

<style scoped>

/* Custom styling for mobile devices*/
@media(max-width: 992px) {
  .col-lg-5{
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
}
.editor-tool{
  margin-bottom: 3rem;
}

.editor-row{
  margin-top:1.25rem;
}

.image-col{
  justify-content: center;
  align-items: center;
  text-align: center;
}

img{
  max-width: 100%;
  max-height: 23rem;
}

.row{
  margin-bottom: 2rem;
}
</style>