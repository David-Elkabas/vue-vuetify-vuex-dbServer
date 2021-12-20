<template>
  <div>
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="10">
        <v-row>
          <v-col>
            <DownloadButton />
          </v-col>
        </v-row>

        <div
          id="capture"
          class="d-flex justify-space-between align-center"
          style=""
        >
          <v-row>
            <v-col cols="4" class="mt-13 ml-n5">
              <div
                id="rightSide"
                class="align-self-end flex-grow-1 flex-shrink-1 mt-16"
              >
                <Networks />
              </div>
            </v-col>

            <v-col cols="8">
              <div id="leftSide" class="flex-grow-1 flex-shrink-1">
                <Locations />
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Locations from "../components/Locations.vue";
import Networks from "../components/Networks.vue";
import DownloadButton from "../components/DownloadButton.vue";

export default {
  components: { Locations, Networks, DownloadButton },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.centerThis td {
  text-align: center !important;
}
#rightSide {
}
#leftSide {
  background: yellow;
}
</style>

