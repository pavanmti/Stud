<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 class="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">Task Manager</h1>
          <p class="text-gray-600 dark:text-gray-400">Organize your assignments and deadlines</p>
        </div>
        <BaseButton @click="showAddTask = true" class="mt-4 md:mt-0">
          <PlusIcon class="w-5 h-5 mr-2" />
          Add Task
        </BaseButton>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Task Lists -->
        <div class="lg:col-span-2">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- To Do -->
            <BaseCard>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <div class="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                To Do ({{ todoTasks.length }})
              </h3>
              <div class="space-y-3">
                <TaskCard 
                  v-for="task in todoTasks" 
                  :key="task.id" 
                  :task="task"
                  @update="updateTask"
                  @delete="deleteTask"
                />
              </div>
            </BaseCard>

            <!-- In Progress -->
            <BaseCard>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <div class="w-3 h-3 rounded-full bg-warning-500 mr-2"></div>
                In Progress ({{ inProgressTasks.length }})
              </h3>
              <div class="space-y-3">
                <TaskCard 
                  v-for="task in inProgressTasks" 
                  :key="task.id" 
                  :task="task"
                  @update="updateTask"
                  @delete="deleteTask"
                />
              </div>
            </BaseCard>

            <!-- Completed -->
            <BaseCard>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <div class="w-3 h-3 rounded-full bg-success-500 mr-2"></div>
                Completed ({{ completedTasks.length }})
              </h3>
              <div class="space-y-3">
                <TaskCard 
                  v-for="task in completedTasks" 
                  :key="task.id" 
                  :task="task"
                  @update="updateTask"
                  @delete="deleteTask"
                />
              </div>
            </BaseCard>
          </div>
        </div>

        <!-- Calendar & Stats -->
        <div class="space-y-6">
          <!-- Mini Calendar -->
          <BaseCard>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Calendar</h3>
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-900 dark:text-white mb-2">December 2024</div>
              <div class="grid grid-cols-7 gap-1 text-sm">
                <div class="font-medium text-gray-500 dark:text-gray-400 p-2">S</div>
                <div class="font-medium text-gray-500 dark:text-gray-400 p-2">M</div>
                <div class="font-medium text-gray-500 dark:text-gray-400 p-2">T</div>
                <div class="font-medium text-gray-500 dark:text-gray-400 p-2">W</div>
                <div class="font-medium text-gray-500 dark:text-gray-400 p-2">T</div>
                <div class="font-medium text-gray-500 dark:text-gray-400 p-2">F</div>
                <div class="font-medium text-gray-500 dark:text-gray-400 p-2">S</div>
                
                <div v-for="day in calendarDays" :key="day" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer transition-colors"
                     :class="day === 15 ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'">
                  {{ day }}
                </div>
              </div>
            </div>
          </BaseCard>

          <!-- Task Stats -->
          <BaseCard>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Task Statistics</h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">Total Tasks</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ totalTasks }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">Completed</span>
                <span class="font-medium text-success-600 dark:text-success-400">{{ completedTasks.length }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">In Progress</span>
                <span class="font-medium text-warning-600 dark:text-warning-400">{{ inProgressTasks.length }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">Pending</span>
                <span class="font-medium text-gray-600 dark:text-gray-400">{{ todoTasks.length }}</span>
              </div>
            </div>
          </BaseCard>

          <!-- Priority Distribution -->
          <BaseCard>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Priority Breakdown</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 rounded-full bg-error-500"></div>
                  <span class="text-gray-700 dark:text-gray-300">High Priority</span>
                </div>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ highPriorityCount }}</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 rounded-full bg-warning-500"></div>
                  <span class="text-gray-700 dark:text-gray-300">Medium Priority</span>
                </div>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ mediumPriorityCount }}</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 rounded-full bg-primary-500"></div>
                  <span class="text-gray-700 dark:text-gray-300">Low Priority</span>
                </div>
                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ lowPriorityCount }}</span>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>

    <!-- Add Task Modal -->
    <div v-if="showAddTask" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Task</h3>
        <form @submit.prevent="addTask">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <input 
                v-model="newTask.title"
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
              <select 
                v-model="newTask.priority"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
              <input 
                v-model="newTask.dueDate"
                type="date" 
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
              <select 
                v-model="newTask.subject"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="English">English</option>
                <option value="History">History</option>
              </select>
            </div>
          </div>
          <div class="flex justify-end space-x-3 mt-6">
            <BaseButton @click="showAddTask = false" variant="secondary">Cancel</BaseButton>
            <BaseButton type="submit">Add Task</BaseButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/solid'
import BaseCard from '../components/UI/BaseCard.vue'
import BaseButton from '../components/UI/BaseButton.vue'
import TaskCard from '../components/Tasks/TaskCard.vue'

export default {
  name: 'TaskManager',
  components: {
    PlusIcon,
    BaseCard,
    BaseButton,
    TaskCard
  },
  setup() {
    const showAddTask = ref(false)
    const tasks = ref([
      { id: 1, title: 'Complete Math Assignment', priority: 'high', status: 'todo', dueDate: '2024-12-20', subject: 'Mathematics' },
      { id: 2, title: 'Physics Lab Report', priority: 'medium', status: 'in-progress', dueDate: '2024-12-22', subject: 'Physics' },
      { id: 3, title: 'History Essay', priority: 'low', status: 'todo', dueDate: '2024-12-25', subject: 'History' },
      { id: 4, title: 'Chemistry Quiz Prep', priority: 'high', status: 'completed', dueDate: '2024-12-15', subject: 'Chemistry' },
      { id: 5, title: 'English Literature Review', priority: 'medium', status: 'completed', dueDate: '2024-12-18', subject: 'English' }
    ])

    const newTask = ref({
      title: '',
      priority: 'medium',
      status: 'todo',
      dueDate: '',
      subject: 'Mathematics'
    })

    const todoTasks = computed(() => tasks.value.filter(task => task.status === 'todo'))
    const inProgressTasks = computed(() => tasks.value.filter(task => task.status === 'in-progress'))
    const completedTasks = computed(() => tasks.value.filter(task => task.status === 'completed'))

    const totalTasks = computed(() => tasks.value.length)
    const highPriorityCount = computed(() => tasks.value.filter(task => task.priority === 'high').length)
    const mediumPriorityCount = computed(() => tasks.value.filter(task => task.priority === 'medium').length)
    const lowPriorityCount = computed(() => tasks.value.filter(task => task.priority === 'low').length)

    const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1)

    const addTask = () => {
      const task = {
        id: Date.now(),
        ...newTask.value
      }
      tasks.value.push(task)
      
      // Reset form
      newTask.value = {
        title: '',
        priority: 'medium',
        status: 'todo',
        dueDate: '',
        subject: 'Mathematics'
      }
      
      showAddTask.value = false
    }

    const updateTask = (taskId, updates) => {
      const index = tasks.value.findIndex(task => task.id === taskId)
      if (index !== -1) {
        tasks.value[index] = { ...tasks.value[index], ...updates }
      }
    }

    const deleteTask = (taskId) => {
      tasks.value = tasks.value.filter(task => task.id !== taskId)
    }

    return {
      showAddTask,
      tasks,
      newTask,
      todoTasks,
      inProgressTasks,
      completedTasks,
      totalTasks,
      highPriorityCount,
      mediumPriorityCount,
      lowPriorityCount,
      calendarDays,
      addTask,
      updateTask,
      deleteTask
    }
  }
}
</script>