import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)
const localStoragePlugin = (store) => {
  store.subscribe((mutation, state, a) => {
    localStorage.setItem('state', JSON.stringify(state))
  })
}

const state = localStorage.getItem('state')
const stateParsed = JSON.parse(state)

let products = [
  {
    title: 'Camisa Social',
    status: 1,
    price: 145.15
  },
  {
    title: 'Shorts',
    status: 1,
    price: 49.9
  },
  {
    title: 'Calça Jeans',
    status: 2,
    price: 149.9
  },
  {
    title: 'Sapato Social',
    status: 1,
    price: 299.9
  }
]
let list = require('./../database.json')

if (stateParsed && stateParsed.products) {
  products = stateParsed.products
}

if (stateParsed && stateParsed.list) {
  list = stateParsed.list
}

const initialState = {
  products,
  list
}

export default new Vuex.Store({
  state: initialState,
  mutations: {
    addItem (state, item) {
      item.created_at = moment().format('YYYY-MM-DD HH:mm:ss')
      item._id = state.list.length + 1
      state.list.push(item)
    },
    removeItem (state, item) {
      state.list.splice(item, 1)
    }
  },
  plugins: [localStoragePlugin]
})
