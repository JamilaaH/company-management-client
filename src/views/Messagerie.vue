<template>
    <div>
        <v-container style="max-width:80%" class="box">
        <h2 class="mb-3">Messagerie</h2>
            <v-row class="space-around d-flex flex-column" >
                <v-card v-for="message in messages" :key="message.time" flat >              
                    <v-list-item
                        :key="message.time"
                        v-if="message.author_id == 1"
                    >
                        <v-list-item-avatar class="align-self-start mr-2">                     
                        <v-avatar color="red" size="36">
                        <span class="white--text">{{ message.author.nom[0] }}</span>
                        </v-avatar>                    
                        </v-list-item-avatar>
                        <v-list-item-content class="received-message">
                        <v-card color="success" class="flex-none">                        
                            <v-card-text class="white--text pa-2 d-flex flex-column">
                            <span class="text-caption">{{ message.author.nom }} </span>                                                 
                            <span class="align-self-start text-subtitle-1">{{ message.message }}</span>
                            <span class="text-caption font-italic align-self-end">{{
                                message.created_at | formatDate
                            }}</span> 
                            </v-card-text>
                        </v-card>                   
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-else :key="message.created_at">
                        <v-list-item-content class="sent-message justify-end">
                        <v-card color="primary" class="flex-none">
                            <v-card-text class="white--text pa-2 d-flex flex-column">
                            <span class="text-caption flex-end">{{ message.entreprise.nom_contact }} </span>                                                                                                                            
                            <span class="text-subtitle-1 chat-message">{{ message.message }}</span>
                            <span class="text-caption font-italic align-self-start">{{
                                message.created_at | formatDate
                            }}</span> 
                            </v-card-text>
                        </v-card>
                        </v-list-item-content>
                        <v-list-item-avatar class="align-self-start ml-2">
                        <v-avatar color="indigo" size="36">
                        <span class="white--text">{{ message.entreprise.nom_contact[0] }}</span>
                        </v-avatar>  
                    </v-list-item-avatar>                    
                    </v-list-item> 
                </v-card>
            </v-row>
            <v-row class="justify-end"> 
                <v-card class="d-flex justify-space-around" flat>
                    <v-text-field v-model="texte" @keypress.enter="envoi" style="width:80vw" placeholder="écrire votre message" name="texte">
                    </v-text-field>
                    <v-btn @click="envoi">V</v-btn>
                </v-card>

            </v-row>
        </v-container>  
    </div>
</template>

<script>
export default {
    name:'messages',
    data() {
        return {
            texte: null
        }
    },
    computed: {
        messages() {
            return this.$store.state.messages 
        }
    },

    methods: {
        envoi() {
            this.$store.dispatch('sendMessage', {"texte" : this.texte})
            // console.log(this.text);
            this.texte=null
        }
    },

    mounted() {
        this.$store.dispatch('getMessages');
    }
};
</script>

<style lang="sass" scoped>
.box
    border: solid #ECEFF1 1px
    border-radius: 15px
    padding: 2%
</style>