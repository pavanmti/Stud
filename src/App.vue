<template>
  <div id="app" class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <TheHeader />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import TheHeader from './components/Layout/TheHeader.vue'

export default {
  name: 'App',
  components: {
    TheHeader
  }
}
</script>