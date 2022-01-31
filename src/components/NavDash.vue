<template>
<v-navigation-drawer app class="deep-purple accent-4" dark permanent>
    <v-list>
      <v-list-item href="/dashboard">
        <v-list-item-icon>
          <v-icon class="mdi mdi-view-dashboard" ></v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title >Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item :to='{name:"Entreprise"}'>
        <v-list-item-icon>
          <v-icon class="mdi mdi-account-box" ></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title >Mon entreprise
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      
      <v-list-item :to='{name:"Taches"}'>
        <v-list-item-icon>
          <v-icon class="mdi mdi-calendar-check" ></v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title >Mes tâches</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item :to='{name:"Messages"}'>
        <v-list-item-icon>
          <v-icon class="mdi mdi-forum" ></v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title >Messagerie</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
            <v-btn @click="logout">Logout</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
    export default {
        methods: {
            logout() {
                this.$store.dispatch('logout');
                this.$router.push({name:"Home"});
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>