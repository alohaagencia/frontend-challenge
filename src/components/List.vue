<template>
  <div id="list" class="col-md-12">
    <h1>Sale Lists</h1>
    <div class="col-md-12">
      <b-form-fieldset horizontal label="Filter" :label-cols="3">
        <b-form-input v-model="filter" placeholder="Type to Search" />
      </b-form-fieldset>
    </div>
    <b-table striped hover
             :items="list"
             :fields="fields"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :filter="filter">
        <template slot="price" scope="data">
          R$ {{formatNumber(data.value)}}
        </template>
        <template slot="created_at" scope="data">
          {{formatDate(data.value)}}
        </template>
        <template slot="action" scope="data">
           <b-button @click="remove(data.item)" variant="danger">Remove</b-button>
        </template>
    </b-table>
    <b-list-group>
      <b-list-group-item>
        <b-row>
          <b-col>Qty: {{list.length}}</b-col>
          <b-col>Total: R$ {{formatNumber(calcTotal())}}</b-col>
        </b-row>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'list',
  computed: {
    list () {
      return this.$store.state.list
    }
  },
  data () {
    return {
      sortBy: 'created_at',
      sortDesc: false,
      filter: null,
      fields: [
        {
          key: 'title',
          label: 'Product'
        },
        {
          key: 'price',
          sortable: true
        },
        {
          key: 'created_at',
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
    formatDate (date) {
      return moment(date).format('DD/MM/YYYY hh:mm')
    },
    remove (item) {
      if (confirm('want to remove the item?')) {
        this.$store.commit('removeItem', item)
      }
    },
    calcTotal () {
      /* eslint-disable */
      let vlTotal = this.list.reduce((acc, prod) => acc += prod.price, 0)
      return vlTotal
    }
  }
}
</script>
