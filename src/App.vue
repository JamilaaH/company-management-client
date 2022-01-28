<template>
  <v-app>
    <Nav v-if="$router.history.current['path'] == '/'"/>
    <NavDash v-if="$router.history.current['path'].includes('dashboard')"/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Nav from './components/Nav.vue';
import NavDash from './components/NavDash.vue';

export default {
  components: { Nav, NavDash },
  name: 'App',

  data: () => ({
    //
  }),
  computed: {
    user() {
      return this.$store.state.user 
    },
    token() {
      return this.$store.state.token 
    },
    entreprise () {
      return this.$store.state.entreprise
    }

  }
};
</script>
