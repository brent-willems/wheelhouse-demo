<template>
  <b-container class="editor">
    <h1>Editor</h1>
    <EditorGallery></EditorGallery>
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