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
        <v-row >
            <v-col cols="12" sm="4" offset-sm="2" v-if="messages || messages !== undefined">
                <v-card dark permanent class="deep-purple accent-4 spacing-playground pa-6">
                    <h2>Messages</h2>
                    <p> {{messages.length}} nouveau message</p>
                    <v-btn @click="checkMessage()">Voir détails</v-btn>
                </v-card>
            </v-col>
            <v-col cols="12" sm="4" offset-sm="1" v-if="taches|| taches !== undefined">
                <v-card dark permanent class="red accent-4 spacing-playground pa-6">
                    <h2>Taches</h2>
                    <p> {{taches.length}} nouvelle tache</p>
                    <v-btn @click="checkTask()">Voir détails</v-btn>
                    
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
                taches: null,
                messages: null
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
                this.taches = response.data.taches
                this.messages = response.data.messages
        })
        },
        methods: {
            checkMessage() {
                axios.put('http://127.0.0.1:8000/api/notifications/messages',{}, {
                headers: {
                Authorization: "Bearer " + this.token
                }
                }).then((response)=>{
                    console.log(response.data);
                    this.messages= null
                })
                this.$router.push({name:'Messages'});
            },
            checkTask() {
                axios.put('http://127.0.0.1:8000/api/notifications/taches',{}, {
                headers: {
                Authorization: "Bearer " + this.token
                }
                }).then((response)=>{
                    console.log(response.data);
                    this.messages= null
                })
                this.$router.push({name:'Taches'});
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>