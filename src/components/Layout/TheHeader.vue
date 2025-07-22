<template>
  <header class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2 group">
            <div class="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span class="text-white font-bold text-sm">ST</span>
            </div>
            <span class="text-xl font-display font-bold text-gray-900 dark:text-white">StudTrack</span>
          </router-link>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex space-x-8">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400"
            :class="$route.path === item.href 
              ? 'text-primary-600 dark:text-primary-400' 
              : 'text-gray-700 dark:text-gray-300'"
          >
            {{ item.name }}
          </router-link>
        </nav>

        <!-- Actions -->
        <div class="flex items-center space-x-4">
          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <SunIcon v-if="isDark" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <MoonIcon v-else class="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          <!-- Mobile Menu -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Bars3Icon class="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
      <div class="px-4 py-2 space-y-1">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          @click="mobileMenuOpen = false"
          class="block px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          :class="$route.path === item.href 
            ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
            : 'text-gray-700 dark:text-gray-300'"
        >
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue'
import { SunIcon, MoonIcon, Bars3Icon } from '@heroicons/vue/24/outline'
import { useTheme } from '../../composables/useTheme'

export default {
  name: 'TheHeader',
  components: {
    SunIcon,
    MoonIcon,
    Bars3Icon
  },
  setup() {
    const { isDark, toggleTheme } = useTheme()
    const mobileMenuOpen = ref(false)

    const navigation = [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Study Timer', href: '/timer' },
      { name: 'Tasks', href: '/tasks' },
      { name: 'Analytics', href: '/analytics' },
      { name: 'Rewards', href: '/gamification' },
      { name: 'Mentors', href: '/mentors' },
      { name: 'Profile', href: '/profile' }
    ]

    return {
      isDark,
      toggleTheme,
      mobileMenuOpen,
      navigation
    }
  }
}
</script>