<template>
    <div>
        <Entreprise v-if="show1" @changer=edit />
        <EditEntreprise v-if="show2" @changer=edit />

    </div>
</template>

<script>
import EditEntreprise from '../components/EditEntreprise.vue'
import Entreprise from '../components/Entreprise.vue'
    export default {
        components: { Entreprise, EditEntreprise },
        data() {
            return {
                show1: true,
                show2:false
            }
        },
        computed: {
            entreprise() {
            return this.$store.state.entreprise[0]
            },
            token() {
            return this.$store.state.token
            }
        },
        mounted() {
            this.$store.dispatch('getEntreprise')
        },
        methods: {
            edit() {
                this.show1 = !this.show1
                this.show2 = !this.show2
            }
        },

    }
</script>

<style lang="scss" scoped>

</style>