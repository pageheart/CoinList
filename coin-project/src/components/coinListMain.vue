<template>
  <div id="app">
    <div>
      <coinListTable />
    </div>
  </div>
</template>

<script>
import coinListTable from './components/coinListTable.vue'

export default {
  name: 'coinListMain',
  components: {
    coinListTable
  }
}
</script>
