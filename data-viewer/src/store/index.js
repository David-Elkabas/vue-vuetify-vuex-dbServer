import Vue from 'vue'
import Vuex from 'vuex'

// import dependency to handle HTTP request to our back end
import axios from "axios";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    NetsName: [],
    OptionsOfEachBase_byID: [],
    Recipes: [],
    Users: [],
    Combinations: { category1: { base1: { options: [] } } }, //will have to change category1 to the right prop 
    bases: [{
      align: "center",
      sortable: false,
    },],
    sizeOfCategory1: 0,
    sizeOfCategory2: 0,
    sizeOfCategory3: 0,
    sizeOfTheBigHeader: 0,
    basesNames: [],
    sizeOfRadioCells: 0,
    rowsID: [],
    sizeOfNets: 0,

  },
  getters: {
    allNetsName: (state) => {
      return state.NetsName
    },
    allOptionsOfEachBase_byID: (state) => {
      return state.OptionsOfEachBase_byID
    },
    allRecipes: (state) => {
      return state.Recipes
    },
    allUsers: (state) => {
      return state.users
    },
    allSizeOfCategories: (state) => {
      return [state.sizeOfTheBigHeader, state.sizeOfCategory1, state.sizeOfCategory2, state.sizeOfCategory3]
    },
    allCombinations: (state) => {
      return state.Combinations
    },
    getSizeOfRadioCells: (state) => {
      return state.sizeOfRadioCells
    }
  },
  // שינויים
  mutations: {

    setNetsName(state, Nets) {
      state.NetsName = Nets
      for (let index in Nets) {
        state.rowsID.push({ id: Number(index) + 1 })
      }
    },
    setOptionsOfEachBase_byID(state, options) {
      state.OptionsOfEachBase_byID = options
    },
    setRecipes(state, newRecipes) {
      state.Recipes = newRecipes
    },
    setUsers(state, Users) {
      state.Users = Users
    },

    setCombinations(state, Combinations) {
      state.Combinations = Combinations
      state.sizeOfCategory1 = Object.keys(Combinations.category1).length + 1
      state.sizeOfCategory2 = Object.keys(Combinations.category2).length
      state.sizeOfCategory3 = Object.keys(Combinations.category3).length
      state.sizeOfTheBigHeader = state.sizeOfCategory1 + state.sizeOfCategory2 + state.sizeOfCategory3


      for (let i in Combinations) {
        for (let key in Combinations[i]) {
          state.bases.push({ text: key, value: key })

          state.sizeOfRadioCells++
          state.basesNames.push(key)
        }
      }
    },
  },
  actions: {
    // GETS
    async GETNetsName({ commit }) {
      try {
        const res = await axios.get("http://localhost:3000/NetsName");
        let netsName = res.data
        commit('setNetsName', netsName)

      } catch (e) {
        console.log(e);
      }
    },

    async GETOptionsOfEachBase_byID({ commit }) {
      try {
        const res = await axios.get("http://localhost:3000/OptionsOfEachBase_byID");
        let options = res.data
        commit('setOptionsOfEachBase_byID', options)

      } catch (e) {
        console.log(e);
      }
    },

    async GETRecipes({ commit }) {
      try {
        const res = await axios.get("http://localhost:3000/Recipes");
        let Recipes = res.data
        commit('setRecipes', Recipes)

      } catch (e) {
        console.log(e);
      }
    },
    async GETUsers({ commit }) {
      try {
        const res = await axios.get("http://localhost:3000/users");
        let users = res.data
        commit('setUsers', users)

      } catch (e) {
        console.log(e);
      }
    },
    async GETCombinations({ commit }) {
      try {
        const res = await axios.get("http://localhost:3000/combinations");
        let combinations = res.data
        commit('setCombinations', combinations)

      } catch (e) {
        console.log(e);
      }
    },


    // POSTS
    async addRecipe({ commit }, item) {
      try {
        const res = await axios.post("http://localhost:3000/Recipes", {
          calories: item.calories,
          carbs: item.carbs,
          fats: item.fats,
          iron: item.iron,
          name: item.name,
          protein: item.protein,
          w: item.w,
          x: item.x,
          y: item.y,
          z: item.z,
        })

        let newRecipes = [...this.getters.allRecipes, res.data];

        commit('setRecipes', newRecipes)

      } catch (e) {
        console.log(e);
      }

    },
    //PATCH
    async editRecipe({ commit }, item) {
      try {
        await axios.patch("http://localhost:3000/Recipes/" + item.id, {
          calories: item.calories,
          carbs: item.carbs,
          fats: item.fats,
          iron: item.iron,
          name: item.name,
          protein: item.protein,
          w: item.w,
          x: item.x,
          y: item.y,
          z: item.z
        })
        // let newRecipes = Object.assign(this.getters.allRecipes[item.id], item);
        // need to change here
        let newRecipes = this.getters.allRecipes

        commit('setRecipes', newRecipes)

      } catch (e) {
        console.log(e);
      }
    },
    //DELETE 
    async deleteRecipe({ commit }, idToRemove) {
      try {
        await axios.delete("http://localhost:3000/Recipes/" + idToRemove)
        // removing from allRecipes the selected index only (1)
        // array.splice(index, how many, item1, ....., itemX)
        let newRecipes = this.getters.allRecipes
        newRecipes.splice(idToRemove, 1);


        commit('setRecipes', newRecipes)
      } catch (e) {
        console.log(e);
      }

    },


  },
  modules: {
  }
})
