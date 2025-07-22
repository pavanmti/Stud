import { ref, computed, onUnmounted } from 'vue'

export function useTimer() {
  const isRunning = ref(false)
  const currentTime = ref(0)
  const totalTime = ref(25 * 60) // 25 minutes in seconds
  const intervals = ref([])
  let interval = null

  const progress = computed(() => {
    return ((totalTime.value - currentTime.value) / totalTime.value) * 100
  })

  const formattedTime = computed(() => {
    const minutes = Math.floor(currentTime.value / 60)
    const seconds = currentTime.value % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  })

  const start = () => {
    if (!isRunning.value) {
      isRunning.value = true
      interval = setInterval(() => {
        if (currentTime.value > 0) {
          currentTime.value--
        } else {
          pause()
          // Timer finished
        }
      }, 1000)
    }
  }

  const pause = () => {
    isRunning.value = false
    if (interval) {
      clearInterval(interval)
      interval = null
    }
  }

  const reset = () => {
    pause()
    currentTime.value = totalTime.value
  }

  const setTime = (minutes) => {
    totalTime.value = minutes * 60
    currentTime.value = minutes * 60
  }

  onUnmounted(() => {
    if (interval) {
      clearInterval(interval)
    }
  })

  // Initialize
  currentTime.value = totalTime.value

  return {
    isRunning,
    currentTime,
    totalTime,
    progress,
    formattedTime,
    start,
    pause,
    reset,
    setTime
  }
}