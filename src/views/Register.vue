<template>
    <v-container>
        <h3>Créer un compte</h3>
    
        <v-text-field
            v-model="connexion.nom"
            label="Nom"
            name="nom"
            required
        ></v-text-field>
        <v-text-field
            v-model="connexion.email"
            :rules="emailRules"
            label="E-mail"
            name="email"
            required
        ></v-text-field>

        <v-text-field
            v-model="connexion.password"
            label="Password"
            name="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            required
        ></v-text-field>
        <v-text-field
            v-model="connexion.password_confirmation"
            label="Password"
            name="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            required
        ></v-text-field>
    
        <v-btn
            color="success"
            class="mr-4"
            @click="inscrire()"
            type="submit"
        >
            Validate
        </v-btn>
        <a href="/login">Déjà un compte ? Se connecter</a>

    </v-container>
</template>

<script>
    export default {
        name: "register",
        data: () => ({
            show1: false,
            valid: true,
            emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                
            ],
            connexion: {
                nom:null,
                email:null,
                password:null,
                password_confirmation: null
            }

        }),

        methods: {
            inscrire() {
                this.$store.dispatch('register', this.connexion)
                this.$router.push({name:'Home'})
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>