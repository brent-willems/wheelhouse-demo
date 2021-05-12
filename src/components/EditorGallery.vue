<template>
  <b-container fluid="lg">
    <h1>Editor Gallery</h1>
    <b-row>
      <b-col>
        <EditorGalleryImage class="b-col" :source="img"></EditorGalleryImage>
      </b-col>
      <b-col>
        <EditorGalleryImage class="b-col" :source="img"></EditorGalleryImage>
      </b-col>
      <b-col>
        <EditorGalleryImage class="b-col" :source="img"></EditorGalleryImage>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import EditorGalleryImage from "@/components/EditorGalleryImage.vue";
import * as ls from '@/assets/js/loremPicsum.js'

export default {
  name: "EditorGallery",
  components: {EditorGalleryImage},
  mixins: [ls],
  data: () => {
    return{
      img: ls.getImage(300,300)
    }
  }
}

</script>

<style scoped>

</style>