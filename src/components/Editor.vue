<template>
  <div>
    <Navbar></Navbar>
    <b-container class="editor">
      <EditorGallery :nr-of-images="imgNr" :image-wh-ratio="0.7"></EditorGallery>
    </b-container>
    <hr>
    <Footer></Footer>
  </div>

</template>

<script>
import EditorGallery from "@/components/EditorGallery";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default {
  name: "Editor",
  components: {Footer, Navbar, EditorGallery},
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

hr{
  border-color: #0091AD;
  margin: 2rem 4rem;
}
footer{
  margin: 0 4rem;
  color: #0091AD;
  background-color: #FFFCFF;
}

nav{
  background-color: #0091AD !important;
  color: #FFFCFF !important;
}

</style>