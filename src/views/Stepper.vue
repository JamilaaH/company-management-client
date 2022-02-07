<template>
    <div>
        <v-container fluid class="mt-5">
            <v-row>
                <v-col cols="12" sm="8" offset-sm="2">
                    <h2>Ajouter votre entreprise</h2>
                    <v-stepper v-model="e1">
                        <v-stepper-header>
                            <v-stepper-step :complete="e1 > 1" step="1">
                                Numéro de TVA
                            </v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step :complete="e1 > 2" step="2">
                                Données de l'entreprise
                            </v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step :complete="e1 > 3" step="3">
                                Personne de contact
                            </v-stepper-step>

                        </v-stepper-header>

                        <v-stepper-items>
                            <v-stepper-content step="1">
                                <v-card class="mb-12 pa-10"  >
                                    <v-form>
                                        <v-text-field :rules ="tvaRules" prefix="0" type="number" label="Numéro de TVA" v-model="form.tva"></v-text-field> 
                                        <small class="red--text" v-if="erreur">Numéro de tva non valide</small>
                                        <br>
                                        <v-btn color="primary" @click=" cherche()"> Continue </v-btn>
                                    </v-form>
                                </v-card>

                            </v-stepper-content>

                            <v-stepper-content step="2">
                                <v-card class="mb-12">

                                    <v-container v-if="entreprise">
                                        <v-row>
                                            <v-col cols="12" sm="12">
                                                <v-text-field v-model="form.activite" label="Activité" >
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" sm="12">
                                                <v-text-field readonly v-model="entreprise.name" label="Nom" >
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" sm="6">
                                                <v-text-field   readonly v-model="entreprise.address.street " label="adresse">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-text-field   readonly v-model="entreprise.address.number " label="numero">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-text-field  readonly v-model="entreprise.address.zip_code" label="code postal" >
                                                </v-text-field>
                                            </v-col>

                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" sm="6">
                                                <v-text-field readonly v-model="entreprise.address.city" label="ville" >
                                                </v-text-field>
                                                <v-text-field readonly v-model="entreprise.address.country" label="pays" >
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>

                                </v-card>

                                <v-btn color="primary" @click="e1 = 3"> Continue </v-btn>

                                <v-btn @click="e1 = 1"> Cancel </v-btn>
                            </v-stepper-content>

                            <v-stepper-content step="3">
                                <v-card class="mb-12" >
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6">
                                                <v-text-field label="Nom" v-model="form.nom_contact" >
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-text-field label="Email de contact" :rules="emailRules" v-model="form.email_contact"  >
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" sm="12">
                                                <v-text-field label="Numéro de contact" v-model="form.numero_contact" prefix="0" >
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>

                                </v-card>

                                <v-btn color="primary" @click="[e1 = 3, envoyer()]"> Continue </v-btn>

                                <v-btn @click="e1 = 2"> Cancel </v-btn>
                            </v-stepper-content>

                        </v-stepper-items>
                    </v-stepper>

                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    data () {
        return {
            e1: 1,
            erreur: false, 
            form: {
                tva:null,
                activite:null,
                nom_contact:null,
                numero_contact:null,
                email_contact:null
            },
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',                
            ],


            tvaRules: [
                v => !!v || 'TVA is required',
                v => (v && v.length == 9) || 'TVA doit être égal à 9 caractères',
                ],
        }
    },
    computed: {
        entreprise () {
                if (this.$store.state.userEntreprise === false) {
                    return false
                } else  {
                    return this.$store.state.entreprise

                }
            
        },

    },
    methods:{
        cherche() {
            console.log(this.form.tva);
            this.$store.dispatch('getTVAEntreprise', this.form.tva)
            if (this.$store.state.step === 'valide') {
                this.e1 = 2 
                console.log(this.e1);
            } else if (this.$store.state.step === 'non valide') {
                this.erreur = true
            }
        },
        envoyer() {
            let donnees = {
            tva:this.form.tva,
            activite:this.form.activite,
            nom:this.entreprise.name,
            adresse:this.entreprise.address.street,
            numero:this.entreprise.address.number,
            ville:this.entreprise.address.city, 
            pays:this.entreprise.address.country, 
            code_postal:this.entreprise.address.zip_code,
            nom_contact:this.form.nom_contact,
            numero_contact:this.form.numero_contact,
            email_contact:this.form.email_contact
            };

            this.$store.dispatch('registerEntreprise', donnees)
            console.log(donnees);
            this.$router.push('/dashboard')
        }
    }
};
</script>

<style lang="scss" scoped>
</style>