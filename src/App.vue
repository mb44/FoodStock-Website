<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <fm-header @viewWasChanged="currentView = $event"></fm-header>
      </div>
      <div class="row">
        <keep-alive>
          <component v-bind:is="currentView"></component>
        </keep-alive>        
      </div>
      <!--
      <div class="row">
        <fm-footer></fm-footer>
      </div>
      -->
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import ListContainers from './components/ListContainers.vue'
import ListFoodTypes from './components/ListFoodTypes.vue'
import ListUsers from './components/ListUsers.vue'

export default {
  data() {
    return {
      currentView: 'fmLogin'
    }
  },
  components: {
    fmHeader: Header,
    fmFooter: Footer,
    fmHome: Home,
    fmLogin: Login,
    fmListContainers: ListContainers,
    fmListFoodTypes: ListFoodTypes,
    fmListUsers: ListUsers
  }
}
</script>

<style>

</style>
