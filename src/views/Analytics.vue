<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 class="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">Analytics Dashboard</h1>
          <p class="text-gray-600 dark:text-gray-400">Track your study progress and productivity</p>
        </div>
        <div class="flex items-center space-x-4 mt-4 md:mt-0">
          <select 
            v-model="timeFilter"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      <!-- Key Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <BaseCard hover class="text-center">
          <div class="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">32h</div>
          <div class="text-gray-600 dark:text-gray-400">Total Study Time</div>
          <div class="text-sm text-success-600 dark:text-success-400 mt-1">+12% from last week</div>
        </BaseCard>
        <BaseCard hover class="text-center">
          <div class="text-3xl font-bold text-success-600 dark:text-success-400 mb-2">85%</div>
          <div class="text-gray-600 dark:text-gray-400">Task Completion</div>
          <div class="text-sm text-success-600 dark:text-success-400 mt-1">+5% from last week</div>
        </BaseCard>
        <BaseCard hover class="text-center">
          <div class="text-3xl font-bold text-warning-600 dark:text-warning-400 mb-2">6.4h</div>
          <div class="text-gray-600 dark:text-gray-400">Daily Average</div>
          <div class="text-sm text-warning-600 dark:text-warning-400 mt-1">-0.2h from last week</div>
        </BaseCard>
        <BaseCard hover class="text-center">
          <div class="text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2">92%</div>
          <div class="text-gray-600 dark:text-gray-400">Focus Score</div>
          <div class="text-sm text-success-600 dark:text-success-400 mt-1">+8% from last week</div>
        </BaseCard>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Study Time Chart -->
        <BaseCard>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Study Time</h3>
          <div class="h-64 flex items-end justify-between space-x-2">
            <div v-for="(day, index) in weeklyData" :key="index" class="flex-1 flex flex-col items-center">
              <div 
                class="w-full bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-md transition-all duration-300 hover:from-primary-600 hover:to-primary-500"
                :style="{ height: `${(day.hours / 8) * 100}%` }"
              ></div>
              <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">{{ day.day }}</div>
              <div class="text-xs font-medium text-gray-900 dark:text-white">{{ day.hours }}h</div>
            </div>
          </div>
        </BaseCard>

        <!-- Subject Distribution -->
        <BaseCard>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Subject Distribution</h3>
          <div class="space-y-4">
            <div v-for="subject in subjectData" :key="subject.name" class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-4 h-4 rounded-full" :style="{ backgroundColor: subject.color }"></div>
                <span class="text-gray-700 dark:text-gray-300">{{ subject.name }}</span>
              </div>
              <div class="text-right">
                <div class="text-sm font-medium text-gray-900 dark:text-white">{{ subject.hours }}h</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ subject.percentage }}%</div>
              </div>
            </div>
          </div>
          <div class="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div class="h-full flex">
              <div 
                v-for="subject in subjectData" 
                :key="subject.name"
                class="h-full transition-all duration-300"
                :style="{ width: `${subject.percentage}%`, backgroundColor: subject.color }"
              ></div>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Activity Heatmap -->
      <BaseCard class="mb-8">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Activity Heatmap</h3>
        <div class="overflow-x-auto">
          <div class="grid grid-cols-24 gap-1 min-w-full">
            <div v-for="hour in 24" :key="hour" class="text-xs text-gray-500 dark:text-gray-400 text-center">
              {{ hour }}:00
            </div>
            <div v-for="(activity, index) in activityData" :key="index" class="h-8 rounded transition-all duration-200 hover:scale-110"
                 :class="getActivityClass(activity)"
                 :title="`${Math.floor(index / 24) + 1} day, ${(index % 24) + 1}:00 - ${activity} hours`">
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between mt-4 text-sm text-gray-500 dark:text-gray-400">
          <span>Less</span>
          <div class="flex items-center space-x-1">
            <div class="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div class="w-3 h-3 bg-primary-200 dark:bg-primary-900 rounded"></div>
            <div class="w-3 h-3 bg-primary-400 dark:bg-primary-700 rounded"></div>
            <div class="w-3 h-3 bg-primary-600 dark:bg-primary-500 rounded"></div>
          </div>
          <span>More</span>
        </div>
      </BaseCard>

      <!-- Progress Tracking -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Goals Progress -->
        <BaseCard>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Goals Progress</h3>
          <div class="space-y-4">
            <div v-for="goal in goals" :key="goal.name" class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-gray-700 dark:text-gray-300">{{ goal.name }}</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ goal.current }}/{{ goal.target }}</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  class="h-2 rounded-full transition-all duration-300"
                  :class="goal.color"
                  :style="{ width: `${(goal.current / goal.target) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
        </BaseCard>

        <!-- Recent Achievements -->
        <BaseCard>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Achievements</h3>
          <div class="space-y-3">
            <div v-for="achievement in achievements" :key="achievement.id" class="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                  <TrophyIcon class="w-5 h-5 text-white" />
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-sm font-medium text-gray-900 dark:text-white">{{ achievement.title }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ achievement.description }}</div>
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400">{{ achievement.date }}</div>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { TrophyIcon } from '@heroicons/vue/24/solid'
import BaseCard from '../components/UI/BaseCard.vue'

export default {
  name: 'Analytics',
  components: {
    TrophyIcon,
    BaseCard
  },
  setup() {
    const timeFilter = ref('week')

    const weeklyData = [
      { day: 'Mon', hours: 6.5 },
      { day: 'Tue', hours: 4.2 },
      { day: 'Wed', hours: 7.8 },
      { day: 'Thu', hours: 5.1 },
      { day: 'Fri', hours: 6.9 },
      { day: 'Sat', hours: 3.5 },
      { day: 'Sun', hours: 4.8 }
    ]

    const subjectData = [
      { name: 'Mathematics', hours: 12.5, percentage: 35, color: '#3B82F6' },
      { name: 'Physics', hours: 8.2, percentage: 25, color: '#10B981' },
      { name: 'Chemistry', hours: 6.8, percentage: 20, color: '#F59E0B' },
      { name: 'English', hours: 4.2, percentage: 12, color: '#EF4444' },
      { name: 'History', hours: 2.8, percentage: 8, color: '#8B5CF6' }
    ]

    const activityData = Array.from({ length: 168 }, () => Math.floor(Math.random() * 4))

    const goals = [
      { name: 'Daily Study Goal', current: 6.5, target: 8, color: 'bg-primary-500' },
      { name: 'Weekly Tasks', current: 12, target: 15, color: 'bg-success-500' },
      { name: 'Math Progress', current: 8, target: 10, color: 'bg-warning-500' },
      { name: 'Reading Goal', current: 5, target: 7, color: 'bg-accent-500' }
    ]

    const achievements = [
      { id: 1, title: 'Study Streak', description: '7 days in a row', date: '2 days ago' },
      { id: 2, title: 'Task Master', description: 'Completed 50 tasks', date: '1 week ago' },
      { id: 3, title: 'Math Wizard', description: 'Spent 20 hours on math', date: '1 week ago' },
      { id: 4, title: 'Early Bird', description: 'Started studying before 8 AM', date: '2 weeks ago' }
    ]

    const getActivityClass = (activity) => {
      const classes = [
        'bg-gray-200 dark:bg-gray-700',
        'bg-primary-200 dark:bg-primary-900',
        'bg-primary-400 dark:bg-primary-700',
        'bg-primary-600 dark:bg-primary-500'
      ]
      return classes[activity] || classes[0]
    }

    return {
      timeFilter,
      weeklyData,
      subjectData,
      activityData,
      goals,
      achievements,
      getActivityClass
    }
  }
}
</script>