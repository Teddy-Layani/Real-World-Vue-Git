<script setup>
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
import { onMounted, ref, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps(['page']) // defineProps is a function that takes an array of prop names and returns an object with the props as keys and their values as values.

const events = ref(null)

const totalEvents = ref(0)

const page = computed(() => props.page)
const hasNextPage = computed(() => totalEvents.value > page.value * 6)
const totalPage = computed(() => Math.floor(totalEvents.value/6) + (totalEvents.value % 6 === 0 ? 0 : 1))

onMounted(() => {
  watchEffect(() => {
    events.value = null
    EventService.getEvents(6, page.value).then((response) => {
      // console.log('events:', response.data)
      events.value = response.data
      totalEvents.value = response.headers['x-total-count']
    }).catch((error) => {
      // console.log(error)
        router.push({ name: 'NetworkError' }) // <<-----
    })
  })
})
</script>

<template>
  <div class="events">
    <h1> Events for goods </h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <router-link id="page-prev" :to="{ name: 'EventList', query: { page: page - 1 } }" rel="prev"
        v-if="page != 1">&lt; Previous</router-link>
      <span>Page: {{ page }}</span>
      <router-link id="page-next" :to="{ name: 'EventList', query: { page: page + 1 } }" rel="next"
        v-if="hasNextPage">Next &gt;</router-link>
    </div>
    <div class="pagination">
      <span>Page: </span>      
      <router-link v-for="i in totalPage" :key="i" :to="{ name: 'EventList', query: { page: i } }">{{ i }}</router-link>
    </div>
  </div>
</template>



<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  align-items: center;
  width: 60%;
  padding-top: 60px;
  /* flex-direction: column; */
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #6c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}

</style>
