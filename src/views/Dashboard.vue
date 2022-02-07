<template>
    <v-container class="mt-10">
        <div class="d-flex justify-space-around">
            <h1> Mon compte</h1>
        <v-btn
            fab
            dark
            small
            color="deep-purple"
            >
            <v-icon dark>
                mdi-account-edit
            </v-icon>
    </v-btn>
        </div>
        <v-row class="my-15">
            <v-col cols="12"
                sm="8" offset-sm="2">
                <v-card dark permanent class="deep-purple accent-4 spacing-playground pa-6">
                    <v-text-field :value="user.nom">
                    </v-text-field>
                    <v-text-field :value="user.email" >
                    </v-text-field>
                    <v-text-field :value="user.password" type="password">
                    </v-text-field>
                </v-card>
            </v-col>
        </v-row>

    </v-container>


</template>

<script>
import axios from 'axios'
    export default {
        name:"Dashboard",
        data() {
            return {
                url:'http://127.0.0.1:8000/',
                notifications: null
            }
        },
        computed: {
            user() {
            return this.$store.state.user
            },
            token() {
            return this.$store.state.token
            }
        },
        mounted() {
            axios.get('http://127.0.0.1:8000/api/dashboard', {
                headers: {
                Authorization: "Bearer " + this.token
            }
        }).then((response)=> {
            if (response.data.valid == true) {
                this.notifications = response.data.data
            } else {
                this.notifications = null
            }
        })
        
        }
    }
</script>

<style lang="scss" scoped>

</style>