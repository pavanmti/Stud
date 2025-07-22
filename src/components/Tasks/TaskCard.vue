<template>
  <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200">
    <div class="flex items-start justify-between mb-2">
      <h4 class="font-medium text-gray-900 dark:text-white text-sm">{{ task.title }}</h4>
      <div class="flex items-center space-x-1">
        <button 
          @click="$emit('update', task.id, { status: nextStatus })"
          class="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
        >
          {{ nextStatusText }}
        </button>
        <button 
          @click="$emit('delete', task.id)"
          class="text-xs text-error-600 hover:text-error-700 dark:text-error-400 ml-2"
        >
          Delete
        </button>
      </div>
    </div>
    
    <div class="flex items-center justify-between text-xs">
      <div class="flex items-center space-x-2">
        <span 
          class="px-2 py-1 rounded-full text-xs font-medium"
          :class="priorityClasses"
        >
          {{ task.priority }}
        </span>
        <span class="text-gray-500 dark:text-gray-400">{{ task.subject }}</span>
      </div>
      <span class="text-gray-500 dark:text-gray-400">{{ formatDate(task.dueDate) }}</span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'TaskCard',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  emits: ['update', 'delete'],
  setup(props) {
    const priorityClasses = computed(() => {
      const classes = {
        high: 'bg-error-100 text-error-800 dark:bg-error-900/20 dark:text-error-400',
        medium: 'bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-400',
        low: 'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400'
      }
      return classes[props.task.priority] || classes.medium
    })

    const nextStatus = computed(() => {
      const statusFlow = {
        'todo': 'in-progress',
        'in-progress': 'completed',
        'completed': 'todo'
      }
      return statusFlow[props.task.status]
    })

    const nextStatusText = computed(() => {
      const statusTexts = {
        'todo': 'Start',
        'in-progress': 'Complete',
        'completed': 'Reopen'
      }
      return statusTexts[props.task.status]
    })

    const formatDate = (dateString) => {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    return {
      priorityClasses,
      nextStatus,
      nextStatusText,
      formatDate
    }
  }
}
</script>