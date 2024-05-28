import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventListView.vue'
import EventDetails from '../views/event/Details.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'EventList',
      component: EventList,
      props: route => ({ page: parseInt(route.query.page) || 1 })
    },
    {
      path: '/event/:id',
      name: 'EventDetails',
      props: true,
      component: EventDetails
    },
    {
      path: '/event/:id/register',
      name: 'EventRegister',
      props: true,
      component: EventRegister
    },
    {
      path: '/event/:id/edit',
      name: 'EventEdit',
      props: true,
      component: EventEdit
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView

      // component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
