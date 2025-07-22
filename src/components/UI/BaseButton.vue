<template>
  <button
    :type="type"
    :disabled="disabled"
    class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    :class="[
      sizeClasses,
      variantClasses,
      {
        'transform hover:scale-105': !disabled,
        'animate-pulse': loading
      }
    ]"
    @click="handleClick"
  >
    <slot v-if="!loading" />
    <div v-else class="flex items-center space-x-2">
      <div class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
      <span v-if="$slots.default">{{ loadingText }}</span>
    </div>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: 'Loading...'
    }
  },
  emits: ['click'],
  computed: {
    sizeClasses() {
      const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
        xl: 'px-8 py-4 text-lg'
      }
      return sizes[this.size]
    },
    variantClasses() {
      const variants = {
        primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500',
        secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white',
        outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white',
        ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500 dark:hover:bg-gray-800 dark:text-gray-300',
        danger: 'bg-error-600 hover:bg-error-700 text-white focus:ring-error-500'
      }
      return variants[this.variant]
    }
  },
  setup(props, { emit }) {
    const handleClick = (event) => {
      if (!props.disabled && !props.loading) {
        emit('click', event)
      }
    }

    return {
      handleClick
    }
  }
}
</script>