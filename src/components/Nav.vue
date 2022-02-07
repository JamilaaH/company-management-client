<template>
    <v-app-bar app>
      <v-app-bar-title>
        <v-btn href="/">
          Company

        </v-btn>
      </v-app-bar-title>

      <v-spacer></v-spacer>

        <v-btn v-if ="token == null" href="/login" class="mr-3" >Se connecter</v-btn>  
        <v-btn v-if ="token !== null" to="/dashboard" class="mr-3" >Dashboard</v-btn>  
        <v-btn v-if ="token !== null"  @click="logout" class="mr-3" >déconnecter</v-btn>  

      <v-divider inset vertical></v-divider>

      <v-btn
        class="mr-4 ml-5"
        color="primary"
        plain
      >
        <v-icon left icon="mdi mdi-handshake-outline"></v-icon>

      </v-btn>
    </v-app-bar>

</template>

<script>
    export default {
        computed: {
            user() {
                return this.$store.state.user 
            },
            token() {
                return this.$store.state.token 
            },
        },
        methods: {
          logout() {
            this.$store.dispatch('logout');
            this.$router.push({name:"Home"});

          }
        },
    }
</script>

<style lang="scss" scoped>

</style>