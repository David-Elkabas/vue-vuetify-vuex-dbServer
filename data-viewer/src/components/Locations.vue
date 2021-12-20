// this is the left side of the about page

<template>
  <div>
    <div>
      <v-card>
        <v-data-table
          :headers="$store.state.bases"
          :items="$store.state.rowsID"
          hide-default-footer
          class="transparent elevation-0 mt-4 table2"
          disable-pagination
          disable-sort
          fixed-header
        >
          <template v-slot:header>
            <thead>
              <tr>
                <th
                  style="text-align: center"
                  :colspan="allSizeOfCategories[0]"
                >
                  start
                </th>
              </tr>
              <tr>
                <th
                  :colspan="allSizeOfCategories[1]"
                  style="text-align: center"
                >
                  Category 1
                </th>
                <th
                  :colspan="allSizeOfCategories[2]"
                  style="text-align: center"
                >
                  Category 2
                </th>
                <th
                  :colspan="allSizeOfCategories[3]"
                  style="text-align: center"
                >
                  Category 3
                </th>
              </tr>
            </thead>
          </template>
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="row in items" :key="row.id">
                <td>{{ row.id }}</td>
                <td
                  class="pr-0"
                  v-for="index in getSizeOfRadioCells"
                  :key="index"
                >
                  <v-select
                    :items="
                      allOptionsOfEachBase_byID.find((a) => a.id === index)
                        .options
                    "
                    color="warning"
                    item-color="warning"
                    item-value="id"
                    item-text="name"
                    class="pa-0"
                    autowidth
                    multiple
                  >
                    <template v-slot:selection="{ item, index }">
                      <v-chip v-if="index === 0" class="ml-7">
                        <span>{{ item }}</span>
                      </v-chip>
                      <span
                        v-if="index === 1"
                        class="warning--text font-weight-bold mx-n7"
                      >
                        יש עוד
                      </span>
                    </template>
                  </v-select>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  async created() {
    this.GETCombinations();
    this.GETOptionsOfEachBase_byID();
    this.GETNetsName();
  },

  methods: {
    ...mapActions([
      "GETCombinations",
      "GETOptionsOfEachBase_byID",
      "GETNetsName",
    ]),
  },
  computed: {
    ...mapState(["Combinations"]),
    ...mapGetters([
      "allSizeOfCategories",
      "getSizeOfRadioCells",
      "allOptionsOfEachBase_byID",
    ]),
  },
};
</script>
<style scope>
.table2 td {
  /*  72 - its the minimum */
  height: 72px !important;
  min-height: 72px;
  max-height: 72px;
}
.table2 th {
  height: 50px !important;
}
</style>
