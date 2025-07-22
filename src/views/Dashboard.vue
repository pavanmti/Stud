<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-display font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            Welcome to <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">StudTrack</span>
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 animate-slide-up">
            Your comprehensive study companion that helps you track progress, manage tasks, and achieve your academic goals with gamified learning.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <BaseButton @click="$router.push('/timer')" size="lg" class="px-8">
              Start Studying
            </BaseButton>
            <BaseButton @click="$router.push('/tasks')" variant="outline" size="lg" class="px-8">
              Manage Tasks
            </BaseButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <BaseCard hover class="text-center">
          <div class="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">2h 45m</div>
          <div class="text-gray-600 dark:text-gray-400">Today's Study Time</div>
        </BaseCard>
        <BaseCard hover class="text-center">
          <div class="text-3xl font-bold text-success-600 dark:text-success-400 mb-2">8/12</div>
          <div class="text-gray-600 dark:text-gray-400">Tasks Completed</div>
        </BaseCard>
        <BaseCard hover class="text-center">
          <div class="text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2">Level 7</div>
          <div class="text-gray-600 dark:text-gray-400">Current Level</div>
        </BaseCard>
      </div>

      <!-- Feature Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <BaseCard 
          v-for="feature in features" 
          :key="feature.title"
          hover
          clickable
          @click="$router.push(feature.href)"
        >
          <div class="text-center">
            <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <component :is="feature.icon" class="w-6 h-6 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400">{{ feature.description }}</p>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  ClockIcon, 
  CheckCircleIcon, 
  ChartBarIcon, 
  TrophyIcon, 
  UserGroupIcon, 
  UserIcon 
} from '@heroicons/vue/24/outline'
import BaseCard from '../components/UI/BaseCard.vue'
import BaseButton from '../components/UI/BaseButton.vue'

export default {
  name: 'Dashboard',
  components: {
    BaseCard,
    BaseButton
  },
  setup() {
    const features = [
      {
        title: 'Study Timer',
        description: 'Focus with Pomodoro technique and track your study sessions',
        icon: ClockIcon,
        href: '/timer'
      },
      {
        title: 'Task Manager',
        description: 'Organize assignments and deadlines with smart calendar',
        icon: CheckCircleIcon,
        href: '/tasks'
      },
      {
        title: 'Analytics',
        description: 'Visualize your progress with detailed charts and insights',
        icon: ChartBarIcon,
        href: '/analytics'
      },
      {
        title: 'Gamification',
        description: 'Earn badges and level up your academic achievements',
        icon: TrophyIcon,
        href: '/gamification'
      },
      {
        title: 'Mentor Channels',
        description: 'Connect with mentors and access learning resources',
        icon: UserGroupIcon,
        href: '/mentors'
      },
      {
        title: 'Profile',
        description: 'Customize your experience and track your journey',
        icon: UserIcon,
        href: '/profile'
      }
    ]

    return {
      features
    }
  }
}
</script>