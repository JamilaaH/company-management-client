<template>
  <v-app>
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
        <v-list-item href="/dashboard/monshop">
            <v-list-item-icon>
            <v-icon class="mdi mdi-account-box" ></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
            <v-list-item-title >Mon Shop
            </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item href="/dashboard/panier">
            <v-list-item-icon>
            <v-icon class="mdi mdi-cart" ></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
            <v-list-item-title >Panier</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item href="/dashboard/commande">
            <v-list-item-icon>
            <v-icon class="mdi mdi-purse" ></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
            <v-list-item-title >Commande</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        </v-list>

        <template v-slot:append>
        <div class="pa-2">
            <v-form action="/logout" method="POST">
                <v-btn type="submit">Logout</v-btn>
            </v-form>
        </div>
        </template>
    </v-navigation-drawer>
    <v-main>
    <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'back',
  computed: {
  user() {
    return this.$store.state.user
  },
  token() {
    return this.$store.state.token
  }
}  ,

  data: () => ({
    //
  }),
};
</script>
