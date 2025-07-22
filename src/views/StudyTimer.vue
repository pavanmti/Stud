<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">Study Timer</h1>
        <p class="text-gray-600 dark:text-gray-400">Stay focused and productive with the Pomodoro technique</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Timer Section -->
        <div class="lg:col-span-2">
          <BaseCard padding="p-8">
            <CircularTimer />
          </BaseCard>
        </div>

        <!-- Study Goals & History -->
        <div class="space-y-6">
          <!-- Daily Goal -->
          <BaseCard>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Daily Goal</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">Target: 4 hours</span>
                <span class="text-primary-600 dark:text-primary-400 font-medium">2h 45m</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-300" style="width: 68.75%"></div>
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">68% complete</div>
            </div>
          </BaseCard>

          <!-- Today's Sessions -->
          <BaseCard>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Today's Sessions</h3>
            <div class="space-y-3">
              <div v-for="session in todaysSessions" :key="session.id" class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <div class="font-medium text-gray-900 dark:text-white">{{ session.subject }}</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">{{ session.time }}</div>
                </div>
                <div class="text-sm font-medium text-primary-600 dark:text-primary-400">{{ session.duration }}</div>
              </div>
            </div>
          </BaseCard>

          <!-- Subject Stats -->
          <BaseCard>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Subject Breakdown</h3>
            <div class="space-y-3">
              <div v-for="subject in subjectStats" :key="subject.name" class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: subject.color }"></div>
                  <span class="text-gray-700 dark:text-gray-300">{{ subject.name }}</span>
                </div>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ subject.time }}</span>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseCard from '../components/UI/BaseCard.vue'
import CircularTimer from '../components/Timer/CircularTimer.vue'

export default {
  name: 'StudyTimer',
  components: {
    BaseCard,
    CircularTimer
  },
  setup() {
    const todaysSessions = [
      { id: 1, subject: 'Mathematics', time: '09:00 AM', duration: '45m' },
      { id: 2, subject: 'Physics', time: '10:30 AM', duration: '25m' },
      { id: 3, subject: 'Chemistry', time: '02:00 PM', duration: '30m' },
      { id: 4, subject: 'English', time: '04:15 PM', duration: '25m' }
    ]

    const subjectStats = [
      { name: 'Mathematics', time: '1h 15m', color: '#3B82F6' },
      { name: 'Physics', time: '45m', color: '#10B981' },
      { name: 'Chemistry', time: '30m', color: '#F59E0B' },
      { name: 'English', time: '25m', color: '#EF4444' }
    ]

    return {
      todaysSessions,
      subjectStats
    }
  }
}
</script>