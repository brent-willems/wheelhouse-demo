<template>
  <div class="editor-tool">
    <h2>EditorTool</h2>
    <b-row>
      <b-col md="6">
        <img :src="src">
      </b-col>
      <b-col md="6">
        <i>Here will be the toolbar</i>
      </b-col>
    </b-row>

  </div>
</template>

<script>
export default {
  name: "EditorTool",
  props:{
    src: String
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