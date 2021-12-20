<template>
  <div ref=" screen">
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="9">
        <h1 class="subheading grey--text pb-3">Recipes</h1>

        <v-card>
          <v-card-title>
            Nutrition
            <v-spacer></v-spacer>
            <v-text-field
              class="mt-n3"
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              color="warning"
            ></v-text-field>
          </v-card-title>

          <!-- will need to change the :items="allRecipes.desserts" to direct array  -->
          <v-data-table
            :headers="headers"
            :items="allRecipes"
            :items-per-page="5"
            class="elevation-1"
            v-model="selected"
            :single-select="singleSelect"
            show-select
            item-key="id"
            :search="search"
          >
            <template v-slot:top>
              <v-switch
                v-model="singleSelect"
                label="Single select"
                class="pr-3 my-n5"
                color="warning"
              ></v-switch>
              <v-dialog v-model="dialogNewItem" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon fab @click="deleteItem()">
                    <v-icon dark> mdi-delete </v-icon>
                  </v-btn>

                  <v-btn fab icon @click="editItem()">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>

                  <v-btn
                    fab
                    icon
                    v-bind="attrs"
                    v-on="on"
                    @click="changeTitle('add')"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <!--  -->
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.name"
                            label="item name"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.calories"
                            label="Calories"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.fat"
                            label="Fat (g)"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.carbs"
                            label="Carbs (g)"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.protein"
                            label="Protein (g)"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.iron"
                            label="iron (%)"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.x"
                            label="x"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.y"
                            label="y"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.z"
                            label="z"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.w"
                            label="w"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="warning" text @click="close"> Cancel </v-btn>
                    <v-btn color="warning" text @click="save"> Save </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline"
                    >Are you sure you want to delete this item?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="warning" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn color="warning" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      dialogNewItem: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
        iron: 0,
        x: 0,
        y: 0,
        z: 0,
        w: 0,
      },
      defaultItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
        iron: 0,
        x: 0,
        y: 0,
        z: 0,
        w: 0,
      },
      search: "",
      singleSelect: false,
      selected: [],
      formTitle: "add an item",
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
        { text: "xxx (%)", value: "x" },
        { text: "yyy (%)", value: "y" },
        { text: "zzz (%)", value: "z" },
        { text: "www (%)", value: "w" },
      ],
    };
  },
  async created() {
    this.GETRecipes();
    // the API of 'allRecipes[ number of items]'
    // item exmpale:
    //  {
    //         "name": "Eclair",
    //         "id": 3,
    //         "calories": 262,
    //         "fat": 16.0,
    //         "carbs": 23,
    //         "protein": 6.0,
    //         "iron": "742%",
    //         "x": 55,
    //         "y": 43,
    //         "z": 22,
    //         "w": 1002
    //     },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    ...mapActions(["GETRecipes", "addRecipe", "deleteRecipe", "editRecipe"]),
    close() {
      this.dialogNewItem = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    changeTitle(mode) {
      if (mode == "edit") this.formTitle = "EDIT item";
      if (mode == "add") this.formTitle = "add an item";
    },
    save() {
      if (this.editedIndex > -1) {
        // for edit option. put the edited item in the right place (desserts[editedIndex])

        // sreaching for the index of the specific item and edit it for the new values
        Object.assign(this.allRecipes[this.editedIndex], this.editedItem);
      } else {
        //POST request
        this.addRecipe(this.editedItem);
      }
      this.close(this.editedItem);
    },

    editItem() {
      if (this.selected.length == 1) {
        this.changeTitle("edit");
        let arr = this.allRecipes; //for cleaner code
        let chosedID = this.selected[0].id;

        this.editedIndex = arr.map((item) => item.id).indexOf(chosedID);
        this.editedItem = Object.assign({}, this.selected[0]);

        //PATCH
        this.editRecipe(this.editedItem);

        //closing the dialog windows
        this.dialogNewItem = true;
      } else {
        alert(" please select only 1 element at a time");
        this.selected = []; // empty the temporary selected array
      }
    },
    deleteItem() {
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      let arr = this.allRecipes; //for cleaner code
      for (let item in this.selected) {
        let chosedID = this.selected[item].id; //for cleaner code

        // DELETE request
        this.deleteRecipe(chosedID);

        // sreaching for the index of the specific item and remove it from the DOM table
        let removeIndex = arr.map((item) => item.id).indexOf(chosedID);
        this.allRecipes.splice(removeIndex, 1);
      }
      this.selected = []; // empty the temporary selected array
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
  computed: {
    ...mapState(["Recipes"]),
    ...mapGetters(["allRecipes"]),
  },
};
</script>

<style>
</style>