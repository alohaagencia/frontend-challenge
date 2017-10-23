<template>
  <section id="home">
    <List></List>
    <hr />
    <Products></Products>
  </section>
</template>

<script>
import Products from '@/components/Products'
import List from '@/components/List'

export default {
  components: { Products, List }
}
</script>