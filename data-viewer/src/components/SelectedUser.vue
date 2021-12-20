<template>
  <div>
    <v-scroll-y-transition mode="out-in">
      <div
        v-if="!selected"
        class="title grey--text text--lighten-1 font-weight-light"
        style="align-self: center"
      >
        Select a User name
      </div>
      <v-card
        v-else
        :key="selected.id"
        class="pt-6 mx-auto"
        flat
        max-width="400"
      >
        <v-card-text>
          <v-row>
            <v-col class="text-right mr-4 mb-2 mt-n4" tag="strong" cols="6">
              properies
            </v-col>
            <v-col tag="strong" class="mt-n4">value</v-col>
          </v-row>
          <v-divider></v-divider>
          <v-divider></v-divider>
          <v-row>
            <v-col class="text-right mr-4 mt-3 mb-1" tag="strong" cols="6">
              id:
            </v-col>
            <v-col class="mt-3 mb-1">{{ selected.id }}</v-col>
            <v-col
              v-if="selected.name"
              class="text-right mr-4 mb-2"
              tag="strong"
              cols="6"
            >
              name:
            </v-col>
            <v-col v-if="selected.name">{{ selected.name }}</v-col>
            <v-col
              v-if="selected.location"
              class="text-right mr-4 mb-2"
              tag="strong"
              cols="6"
            >
              location:
            </v-col>
            <v-col v-if="selected.location">
              {{ selected.location }}
            </v-col>
            <v-col
              v-if="selected.type"
              class="text-right mr-4 mb-2"
              tag="strong"
              cols="6"
            >
              type:
            </v-col>
            <v-col v-if="selected.type">
              {{ selected.type }}
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-scroll-y-transition>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  props: ["active"],

  data: () => ({
    open: [],
  }),

  async created() {
    this.GETUsers();
  },
  methods: {
    ...mapActions(["GETUsers"]),
  },
  computed: {
    ...mapState(["Users"]),
    ...mapGetters(["allUsers"]),

    selected() {
      // console.log(this.active);
      if (!this.active.length) return undefined;

      const id = this.active[0];
      return this.Users.find((user) => user.id === id);
    },
  },
};
</script>

<style>
</style>