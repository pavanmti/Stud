import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import StudyTimer from '../views/StudyTimer.vue'
import TaskManager from '../views/TaskManager.vue'
import Analytics from '../views/Analytics.vue'
import Gamification from '../views/Gamification.vue'
import MentorChannels from '../views/MentorChannels.vue'
import Profile from '../views/Profile.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/timer',
    name: 'StudyTimer',
    component: StudyTimer
  },
  {
    path: '/tasks',
    name: 'TaskManager',
    component: TaskManager
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: Analytics
  },
  {
    path: '/gamification',
    name: 'Gamification',
    component: Gamification
  },
  {
    path: '/mentors',
    name: 'MentorChannels',
    component: MentorChannels
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router