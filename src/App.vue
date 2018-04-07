<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <fm-header></fm-header>
      </div>
      <div class="row p-3" v-if="getCurrentUser!=null">
        <fm-auth-status></fm-auth-status>
      </div>
      <div class="row p-3">
        <router-view></router-view>
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
import AuthStatus from './components/AuthStatus.vue'
import Home from './components/Home.vue'
import ListContainers from './components/ListContainers.vue'
import ListFoodTypes from './components/ListFoodTypes.vue'
import ListUsers from './components/ListUsers.vue'
import EditContainer from './components/EditContainer.vue'

export default {
  components: {
    fmHeader: Header,
    fmFooter: Footer,
    fmHome: Home,
    fmLogin: Login,
    fmAuthStatus: AuthStatus,
    fmListContainers: ListContainers,
    fmEditContainer: EditContainer,
    fmListFoodTypes: ListFoodTypes,
    fmListUsers: ListUsers
  },
  computed: {
    getCurrentUser() {
      return this.$store.getters.getCurrentUser
    }
  }
}
</script>

<style>
</style>
