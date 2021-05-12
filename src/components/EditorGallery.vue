<template>
  <div>
    <h1>Editor Gallery</h1>

    <b-row align-h="center" align-v="center">
      <b-col md="4">
        <EditorGalleryImage :src="src" ></EditorGalleryImage>
      </b-col>
      <b-col md="4">
        <EditorGalleryImage :src="src" ></EditorGalleryImage>
      </b-col>
      <b-col md="4">
        <EditorGalleryImage :src="src" ></EditorGalleryImage>
      </b-col>
    </b-row>

    <b-row align-h="center" align-v="center">
      <b-col md="4">
        <EditorGalleryImage :src="src" ></EditorGalleryImage>
      </b-col>
      <b-col md="4">
        <EditorGalleryImage :src="src" ></EditorGalleryImage>
      </b-col>
      <b-col md="4">
        <EditorGalleryImage :src="src" ></EditorGalleryImage>
      </b-col>
    </b-row>

  </div>
</template>

<script>
//import EditorGalleryImage from "@/components/EditorGalleryImage.vue";
import * as ls from '@/assets/js/loremPicsum.js'
//import AsyncImage from "@/components/AsyncImage";
import EditorGalleryImage from "@/components/EditorGalleryImage.vue" //Dynamic import of EditorGalleryImage
export default {
  name: "EditorGallery",
  components: {
    EditorGalleryImage

  },
  data: () => {
    return{
      //img: "" //ls.getImage(window.innerWidth) // Get Images based on viewport width and height
      src: ls.getImage(600,500)
    }
  }
}

</script>

<style scoped>
.row{
  text-align: center;
  margin: 1em 0
}

@media(max-width: 768px){
  .col-md-4{
    margin: 0.5em 0;
    /*flex: 0 0 33.333333%;*/
    /*max-width: 33.333%;*/
  }
}




</style>