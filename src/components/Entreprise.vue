<template>
  <v-container-fluid class="mt-10">
    <div class="d-flex justify-space-around">
      <h1>Mon entreprise</h1>
      <v-btn fab dark small color="deep-purple" @click="edit">
        <v-icon dark> mdi-account-edit </v-icon>
      </v-btn>
    </div>
    <v-row>
      <v-col cols="12" sm="8" offset-sm="2">
        <v-card
          dark
          permanent
          class="deep-purple accent-4 spacing-playground pa-6"
        >
          <v-container-fluid>
            <v-row>
              <v-col cols="12" sm="4">
                <v-text-field readonly v-model="entreprise.tva"> </v-text-field>

                <v-text-field readonly :value="entreprise.nom"> </v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field readonly :value="entreprise.activite">
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field readonly v-model="entreprise.adresse"> </v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field readonly v-model="entreprise.code_postal">
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="4">
                <v-text-field readonly :value="entreprise.ville">
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field readonly :value="entreprise.pays"> </v-text-field>
              </v-col>
            </v-row>
          </v-container-fluid>
        </v-card>
        <v-card
          dark
          permanent
          class="deep-purple accent-4 spacing-playground pa-6 mt-4"
        >
          <v-card-title> Personne de contact </v-card-title>
          <v-container-fluid>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field readonly :value="entreprise.nom_contact">
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field readonly :value="'0' + entreprise.numero_contact">
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field readonly :value="entreprise.email">
                </v-text-field>
              </v-col>
            </v-row>
          </v-container-fluid>
        </v-card>
      </v-col>
    </v-row>
  </v-container-fluid>
</template>

<script>
export default {
  computed: {
    entreprise() {
      return this.$store.state.entreprise[0];
    },
    token() {
      return this.$store.state.token;
    },
  },
  mounted() {
    this.$store.dispatch("getEntreprise");
  },
  methods: {
    edit() {
      this.$emit("changer");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>