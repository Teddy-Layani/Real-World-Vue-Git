<script setup>
import { useRouter } from 'vue-router'
import { defineProps, inject } from "vue";

const { event } = defineProps(['event'])
const router = useRouter()
const GStore = inject('GStore')

const register = () => {
    // Call to API
    // If registered then redirect to event details page
    GStore.flashMessage = 'You are successfully registered for ' + event.title
    setTimeout(() => {
        GStore.flashMessage = ''
    }, 3000)

    router.push({
        name: 'EventDetails',
    })
}

</script>
<template>
    <p>Register for the event here</p>
    <!-- <button @click="$emit('register')">Register</button> -->
    <button @click="register">Register Me!</button>
</template>
