<script setup>
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const event = ref(null)
const props = defineProps({
  id:{
    required: true,
  }
})

onMounted( ()=>{
    // fetch event (by id) and set local data
  // EventService.getEvent(route.params.id).then( (response)=>{
  EventService.getEvent(props.id).then( (response)=>{
    // console.log('events:', response.data)
    event.value = response.data
  }).catch( (error)=>{
    console.log(error)
  })
})
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'EventDetails', params: { id } }"
        >Details</router-link>
      |
      <router-link :to="{ name: 'EventRegister', params: { id } }"
        >Register</router-link>
      |
      <router-link :to="{ name: 'EventEdit', params: { id } }"
        >Edit</router-link>
    </div>
    
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>
<style scoped>
  .events{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

</style>
