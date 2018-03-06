<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <fm-header></fm-header>
      </div>
      <div class="row">
        <fm-home></fm-home>
      </div>
      <div class="row">
      <fm-footer></fm-footer>
    </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Home from './components/Home.vue'
import Footer from './components/Footer.vue'

export default {
  data() {
    
  },
  components: {
    fmHeader: Header,
    fmFooter: Footer,
    fmHome: Home
  }
}
</script>

<style>

</style>
