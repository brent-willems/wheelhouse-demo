<template>
  <div>
    <div v-if="!blobUrl" class="d-flex justify-content-center align-items-center text-center h-100">
      <b-spinner type="grow" label="Loading..."></b-spinner>
    </div>

    <img v-if="blobUrl" ref="image" :src="blobUrl" @load="loaded" alt="" :style="style"/>
  </div>
</template>

<script>

// EditorGalleryImage async image loading:
// adapted from: https://gist.github.com/nebaughman/6af3d7fadbbbd1f641188079a545ae00

import axios from "axios"
/**
 * Load an image url as a blob
 */
async function load(src) {
  const config = { url: src, method: "get", responseType: "blob" }
  const response = await axios.request(config)
  return response.data // the blob
}
/**
 * Loads the image as a blob and createObjectURL().
 * Set the img tag's src to the object url.
 * Once the image is loaded, revoke the object url (avoid memory leak).
 * Notice that the page can still show the image, but the src blob is no longer valid.
 */
export default {
  name: "AsyncImage",
  data() {
    return {
      resUrl: "",
      blobUrl: null,
      style: ""
    }
  },
  props: {
    spinnerW: {
      type: Number
    },
    spinnerH:{
      type: Number
    },
    src: {
      type: String,
    },
  },
  methods: {
    loaded() {
      if (this.blobUrl) URL.revokeObjectURL(this.blobUrl)
    },
  },
  watch: {
    src: {
      immediate: true,
      handler(src) {
        if (!src) return
        load(src).then(blob => {
         this.blobUrl = URL.createObjectURL(blob)
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
}

.spinner-grow{
  color: #0091AD;
}

</style>