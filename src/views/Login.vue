<template>
    <v-container>
        <h3>Se connecter</h3>
    
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
            required @keypress.enter="connected()"
        ></v-text-field>
    
        <v-btn
            color="success"
            class="mr-4"
            @click="connected()"
            type="submit"
        >
            Validate
        </v-btn>
        <a href="/register">Se créer un compte</a>
    </v-container>

</template>

<script>
    export default {
        name: "Login",
        data: () => ({
            show1: false,
            valid: true,
            emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                
            ],
            connexion: {
                email:null,
                password:null
            }

        }),

        methods: {
            connected() {
                this.$store.dispatch('login', this.connexion)
                this.$router.push({name:'Home'})
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>