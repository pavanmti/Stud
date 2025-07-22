<template>
  <div 
    class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300"
    :class="[
      padding,
      {
        'hover:scale-105': hover,
        'cursor-pointer': clickable
      }
    ]"
    @click="handleClick"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
  props: {
    padding: {
      type: String,
      default: 'p-6'
    },
    hover: {
      type: Boolean,
      default: false
    },
    clickable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const handleClick = () => {
      if (props.clickable) {
        emit('click')
      }
    }

    return {
      handleClick
    }
  }
}
</script>