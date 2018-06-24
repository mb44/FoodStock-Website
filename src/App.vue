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

export default {
  computed: {
    getCurrentUser() {
      return this.$store.getters.getCurrentUser
    }
  }
}
</script>

<style>
</style>
