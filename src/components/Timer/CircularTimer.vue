<template>
  <div class="flex flex-col items-center space-y-6">
    <!-- Circular Progress -->
    <div class="relative">
      <svg class="w-64 h-64 transform -rotate-90" viewBox="0 0 100 100">
        <!-- Background circle -->
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          class="text-gray-300 dark:text-gray-600"
        />
        <!-- Progress circle -->
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          class="text-primary-600 dark:text-primary-400 transition-all duration-300"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="strokeDashoffset"
        />
      </svg>
      
      <!-- Time Display -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center">
          <div class="text-4xl font-bold text-gray-900 dark:text-white font-mono">
            {{ formattedTime }}
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {{ currentSubject }}
          </div>
        </div>
      </div>
    </div>

    <!-- Subject Selector -->
    <div class="w-full max-w-xs">
      <select
        v-model="currentSubject"
        class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      >
        <option v-for="subject in subjects" :key="subject" :value="subject">
          {{ subject }}
        </option>
      </select>
    </div>

    <!-- Timer Controls -->
    <div class="flex items-center space-x-4">
      <BaseButton
        v-if="!isRunning"
        @click="start"
        variant="primary"
        size="lg"
        class="px-8"
      >
        <PlayIcon class="w-5 h-5 mr-2" />
        Start
      </BaseButton>
      
      <BaseButton
        v-else
        @click="pause"
        variant="secondary"
        size="lg"
        class="px-8"
      >
        <PauseIcon class="w-5 h-5 mr-2" />
        Pause
      </BaseButton>

      <BaseButton
        @click="reset"
        variant="outline"
        size="lg"
      >
        <ArrowPathIcon class="w-5 h-5 mr-2" />
        Reset
      </BaseButton>
    </div>

    <!-- Timer Presets -->
    <div class="flex items-center space-x-2">
      <button
        v-for="preset in presets"
        :key="preset"
        @click="setTime(preset)"
        class="px-3 py-1 text-sm rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        :class="totalTime === preset * 60 ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400' : ''"
      >
        {{ preset }}m
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { PlayIcon, PauseIcon, ArrowPathIcon } from '@heroicons/vue/24/solid'
import { useTimer } from '../../composables/useTimer'
import BaseButton from '../UI/BaseButton.vue'

export default {
  name: 'CircularTimer',
  components: {
    PlayIcon,
    PauseIcon,
    ArrowPathIcon,
    BaseButton
  },
  setup() {
    const { isRunning, currentTime, totalTime, progress, formattedTime, start, pause, reset, setTime } = useTimer()
    
    const currentSubject = ref('Mathematics')
    const subjects = ['Mathematics', 'Science', 'History', 'English', 'Programming', 'Physics', 'Chemistry', 'Biology']
    const presets = [15, 25, 45, 60]

    const circumference = 2 * Math.PI * 45
    const strokeDashoffset = computed(() => {
      return circumference - (progress.value / 100) * circumference
    })

    return {
      isRunning,
      currentTime,
      totalTime,
      progress,
      formattedTime,
      start,
      pause,
      reset,
      setTime,
      currentSubject,
      subjects,
      presets,
      circumference,
      strokeDashoffset
    }
  }
}
</script>