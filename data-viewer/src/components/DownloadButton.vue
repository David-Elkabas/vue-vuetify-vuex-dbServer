<template>
  <v-container class="d-flex justify-center">
    <v-btn @click="downloadImage()">download picture</v-btn>
  </v-container>
</template>

<script>
import html2canvas from "html2canvas";

export default {
  data() {
    return {};
  },
  methods: {
    downloadImage() {
      html2canvas(document.querySelector("#capture")).then((canvas) => {
        let dataURL = canvas.toDataURL("image/png");
        if (dataURL !== "") {
          var img = dataURL;
          var alink = document.createElement("a");
          alink.href = img;
          let time = this.getTheTime();

          alink.download = time;
          alink.click();
        }
      });
    },
    getTheTime() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear();

      let hours = today.getHours();
      let minutes = today.getMinutes();
      let seconds = today.getSeconds();

      today = `${hours}-${minutes}-${seconds}  ${dd}-${mm}-${yyyy}`;

      return today;
    },
  },
};
</script>

<style>
</style>