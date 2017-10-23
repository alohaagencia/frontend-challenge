<template>
  <div id="products" class="col-md-12">
    <h2>Products</h2>
    <div class="col-md-12">
      <b-form-fieldset horizontal label="Filter" :label-cols="3">
        <b-form-input v-model="filter" placeholder="Type to Search" />
      </b-form-fieldset>
    </div>
    <b-table striped hover
             :items="products"
             :fields="fields"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :filter="filter">
      <template slot="status" scope="data">
        {{status[data.value]}}
      </template>
      <template slot="price" scope="data">
        R$ {{formatNumber(data.value)}}
      </template>
      <!-- A virtual composite column -->
      <template slot="action" scope="data">
        <b-button :disabled="data.item.status == 2" @click="add(data.item)">Add to List</b-button>
      </template>
    </b-table>
    <p>
      Sorting By: <b>{{ sortBy }}</b>,
      Sort Direction: <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
    </p>
  </div>
</template>

<script>
export default {
  name: 'products',
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  data () {
    return {
      status: {
        1: 'Active',
        2: 'Block'
      },
      sortBy: 'price',
      sortDesc: false,
      filter: null,
      fields: [
        {
          key: 'title',
          label: 'Product'
        },
        {
          key: 'status'
        },
        {
          key: 'price',
          sortable: true
        },
        {
          key: 'action',
          label: 'Action' }
      ]
    }
  },
  methods: {
    formatNumber (number) {
      return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(number).replace('R$', '')
    },
    add (product) {
      this.$store.commit('addItem', product)
    }
  }
}
</script>

