<template>
  <b-container class="editor">
    <h1>Editor</h1>
    <EditorGallery :nr-of-images="6" :image-wh-ratio="0.7"></EditorGallery>
  </b-container>
</template>

<script>
import EditorGallery from "@/components/EditorGallery";
export default {
  name: "Editor",
  components: {EditorGallery}
}
</script>

<style scoped>
.editor{
  color: #0091AD;
}
</style>