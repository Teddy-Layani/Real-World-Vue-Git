<script setup>
import EventService from '@/services/EventService.js'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const event = ref(null)
const props = defineProps({
    id: {
        required: true,
    }
})

onMounted(() => {
    // fetch event (by id) and set local data
    // EventService.getEvent(route.params.id).then( (response)=>{
    EventService.getEvent(props.id).then((response) => {
        // console.log('events:', response.data)
        event.value = response.data
    }).catch((error) => {
        // console.log(error)
        if (error.response && error.response.status == 404) {
            router.push({
                name: '404Resource',
                params: { resource: 'event' }
            })
        } else {
            router.push({ name: 'NetworkError' })
        }
    })
})
</script>

<template>
    <div v-if="event">
        <h1>{{ event.title }}</h1>
        <div id="nav">
            <router-link :to="{ name: 'EventDetails' }">Details</router-link>
            |
            <router-link :to="{ name: 'EventRegister' }">Register</router-link>
            |
            <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
        </div>

        <router-view :event="event" />

    </div>
</template>
<style scoped>
.events {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>