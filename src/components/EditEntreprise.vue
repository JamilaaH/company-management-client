<template>
    <v-container class="mt-10">
        <div class="d-flex justify-space-around">
            <h1> Modifier</h1>
        <v-btn
            fab
            dark
            small
            color="deep-purple" @click="edit"
            >
            <v-icon dark>
                mdi-account
            </v-icon>
        </v-btn>
        </div>
        <v-row>
            <v-col cols="12" sm="8" offset-sm="2">
                <v-form > 
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="4">
                                <v-text-field readonly v-model="boite.tva" >
                                </v-text-field>
                                <v-text-field readonly v-model="boite.nom" >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4">
                                <v-text-field v-model="boite.activite"   >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4">
                                <v-text-field readonly v-model="boite.adresse"   >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4">
                                <v-text-field readonly v-model="boite.code_postal"   >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4">
                                <v-text-field readonly v-model="boite.ville"   >
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field readonly  v-model="boite.pays" >
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="boite.nom_contact"  >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="boite.numero_contact" prefix="0"  >
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <v-text-field v-model="boite.email"     >
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-btn type="submit" @click="envoyer">valider</v-btn>
                </v-form>

            </v-col>
        </v-row>
    </v-container>


</template>

<script>
    export default {
        computed: {
            boite() {
                return this.$store.state.entreprise[0]
            },
            token() {
                return this.$store.state.token
            }
        },


        mounted() {
            this.$store.dispatch('getEntreprise')
        },
        methods:{
            edit() {
                this.$emit('changer')
            },
            envoyer() {
                this.$store.dispatch('editEntreprise', this.boite)
                this.$router.push('/dashboard')
            }
        }

    }
</script>

<style lang="scss" scoped>

</style>