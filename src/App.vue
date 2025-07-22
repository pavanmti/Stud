<template>
  <div id="app" class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <TheHeader v-if="isLoggedIn" />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import TheHeader from './components/Layout/TheHeader.vue'

export default {
  name: 'App',
  components: {
    TheHeader
  },
  setup() {
    const route = useRoute()
    
    // For now, we'll consider user logged in if they're not on the login page
    // In a real app, this would check authentication state
    const isLoggedIn = computed(() => {
      return route.path !== '/'
    })
    
    return {
      isLoggedIn
    }
  }
}
</script>