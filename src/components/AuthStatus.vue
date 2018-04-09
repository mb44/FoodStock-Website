<template>
  <div class="main col-sm-6 p-0">
    <p><em>Signed in as: {{ getCurrentUser }}&nbsp;-&nbsp;<a @click.prevent="signOut">Sign out</a></em></p>
  </div>
</template>

<script> 
export default {
    computed: {
        getCurrentUser() {
            return this.$store.getters.getCurrentUser
        }
    },
    methods: {
        signOut() {
            this.$store.commit('signOut')
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {   
            if (vm.$store.getters.getCurrentUser == null) {
            vm.$router.replace("/login")
        }
    })
  } 
}
</script>

<style>
    a:hover {
        cursor: pointer;
    }
</style>

