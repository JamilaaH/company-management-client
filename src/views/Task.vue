<template>
    <v-container>
        <h2>Mes taches</h2>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                <tr>
                    <th class="text-left">
                    Taches
                    </th>
                    <th class="text-left">
                    Statut
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="tache, index in taches"
                    :key="index"
                >
                    <td>{{ tache.text }}</td>
                    <td>
                        <v-btn-toggle color="deep-purple accent-3" v-model="tache.etat">
                            <v-btn @click="envoie(tache.id)">
                                Non fait
                            </v-btn>
                    
                            <v-btn @click="envoie(tache.id)">
                                Fait
                            </v-btn>
                    
                        </v-btn-toggle>
                    </td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>
    </v-container>
</template>

<script>
    export default {
        computed: {
            taches() {
                return this.$store.state.task 
            }
        },
        mounted() {
            this.$store.dispatch('getTask')
        },
        methods: {
            envoie(index) {
                this.$store.dispatch('updateTask', index)
                console.log(index);
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>