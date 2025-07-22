<template>
  <header class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/dashboard" class="flex items-center space-x-2 group">
            <div class="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span class="text-white font-bold text-sm">ST</span>
            </div>
            <span class="text-xl font-display font-bold text-gray-900 dark:text-white">StudTrack</span>
          </router-link>
        </div>

        <!-- Navigation - Only show when logged in -->
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
          <!-- User Menu - Only show when logged in -->
          <div class="relative">
            <button
              @click="showUserMenu = !showUserMenu"
              class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div class="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                <span class="text-white font-bold text-sm">JD</span>
              </div>
              <ChevronDownIcon class="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>

            <!-- User Dropdown -->
            <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1">
              <router-link
                to="/profile"
                @click="showUserMenu = false"
                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Profile Settings
              </router-link>
              <button
                @click="handleLogout"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Sign Out
              </button>
            </div>
          </div>

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
        <div class="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
          <button
            @click="handleLogout"
            class="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue'
import { SunIcon, MoonIcon, Bars3Icon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '../../composables/useTheme'

export default {
  name: 'TheHeader',
  components: {
    SunIcon,
    MoonIcon,
    Bars3Icon,
    ChevronDownIcon
  },
  setup() {
    const { isDark, toggleTheme } = useTheme()
    const mobileMenuOpen = ref(false)
    const showUserMenu = ref(false)

    const navigation = [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Study Timer', href: '/timer' },
      { name: 'Tasks', href: '/tasks' },
      { name: 'Analytics', href: '/analytics' },
      { name: 'Rewards', href: '/gamification' },
      { name: 'Mentors', href: '/mentors' }
    ]

    const handleLogout = () => {
      // Handle logout logic
      console.log('Logging out...')
      // Redirect to login page
      window.location.href = '/'
    }

    return {
      isDark,
      toggleTheme,
      mobileMenuOpen,
      showUserMenu,
      navigation,
      handleLogout
    }
  }
}
</script>
</template>