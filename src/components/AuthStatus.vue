<template>
  <div class="main col-sm-6">
    <p><em>Signed in as: {{ getCurrentUser }}&nbsp;-&nbsp;<a @click.prevent="signOut">Sign out</a></em></p>
  </div>
</template>

<script>
import Firebase from 'firebase'
    
export default {
    data: function() {
        return {

        }
    },
    computed: {
        getCurrentUser() {
            return this.$store.getters.getCurrentUser
        }
    },
    methods: {
        signOut() {
            Firebase.auth().signOut().then(function() {
                alert("Logged out")
            }).catch(function(error) {
                alert("Error")
            })
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

