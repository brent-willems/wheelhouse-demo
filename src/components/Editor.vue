<template>
  <b-container class="editor">
    <h1>Editor</h1>
    <EditorGallery :nr-of-images="imgNr" :image-wh-ratio="0.7"></EditorGallery>
  </b-container>
</template>

<script>
import EditorGallery from "@/components/EditorGallery";
export default {
  name: "Editor",
  components: {EditorGallery},
  data(){
    return{
      imgNr: 6 // Load a default of 6 images initially
    }
  },
}
</script>

<style scoped>
.editor{
  color: #0091AD;
}

</style>