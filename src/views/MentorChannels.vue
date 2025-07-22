<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">Mentor Channels</h1>
        <p class="text-gray-600 dark:text-gray-400">Connect with mentors and access learning resources</p>
      </div>

      <!-- Featured Channels -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <BaseCard 
          v-for="channel in featuredChannels" 
          :key="channel.id"
          hover
          clickable
          @click="selectedChannel = channel"
        >
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-white font-bold text-lg">{{ channel.mentor.charAt(0) }}</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ channel.name }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">{{ channel.description }}</p>
            <div class="flex items-center justify-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
              <span>{{ channel.students }} students</span>
              <span>{{ channel.videos }} videos</span>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Channel Content -->
      <div v-if="selectedChannel" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Video Content -->
        <div class="lg:col-span-2">
          <BaseCard>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{{ selectedChannel.name }} - Latest Videos</h3>
            <div class="space-y-4">
              <div v-for="video in selectedChannel.recentVideos" :key="video.id" class="flex space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                <div class="flex-shrink-0">
                  <div class="w-32 h-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                    <PlayIcon class="w-8 h-8 text-white" />
                  </div>
                </div>
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900 dark:text-white mb-1">{{ video.title }}</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">{{ video.description }}</p>
                  <div class="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                    <span>{{ video.duration }}</span>
                    <span>{{ video.views }} views</span>
                    <span>{{ video.date }}</span>
                  </div>
                </div>
              </div>
            </div>
          </BaseCard>

          <!-- Assignments -->
          <BaseCard class="mt-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Assignments</h3>
            <div class="space-y-3">
              <div v-for="assignment in selectedChannel.assignments" :key="assignment.id" class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div class="flex justify-between items-start mb-2">
                  <h4 class="font-medium text-gray-900 dark:text-white">{{ assignment.title }}</h4>
                  <span 
                    class="px-2 py-1 rounded-full text-xs font-medium"
                    :class="assignment.status === 'completed' ? 'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-400' : 
                           assignment.status === 'pending' ? 'bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-400' :
                           'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'"
                  >
                    {{ assignment.status }}
                  </span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">{{ assignment.description }}</p>
                <div class="flex justify-between items-center text-sm">
                  <span class="text-gray-500 dark:text-gray-400">Due: {{ assignment.dueDate }}</span>
                  <BaseButton v-if="assignment.status === 'not_started'" size="sm">Start Assignment</BaseButton>
                  <BaseButton v-else-if="assignment.status === 'pending'" variant="outline" size="sm">Continue</BaseButton>
                  <span v-else class="text-success-600 dark:text-success-400">Completed</span>
                </div>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Channel Info & Chat -->
        <div class="space-y-6">
          <!-- Channel Info -->
          <BaseCard>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Channel Info</h3>
            <div class="text-center mb-4">
              <div class="w-20 h-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span class="text-white font-bold text-2xl">{{ selectedChannel.mentor.charAt(0) }}</span>
              </div>
              <h4 class="font-semibold text-gray-900 dark:text-white">{{ selectedChannel.mentor }}</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ selectedChannel.subject }} Expert</p>
            </div>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Students</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ selectedChannel.students }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Videos</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ selectedChannel.videos }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Rating</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ selectedChannel.rating }}/5</span>
              </div>
            </div>
          </BaseCard>

          <!-- Live Chat -->
          <BaseCard>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Live Chat</h3>
            <div class="space-y-3 h-64 overflow-y-auto">
              <div v-for="message in chatMessages" :key="message.id" class="flex space-x-3">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                    <span class="text-xs font-medium text-gray-700 dark:text-gray-300">{{ message.user.charAt(0) }}</span>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-sm">
                    <span class="font-medium text-gray-900 dark:text-white">{{ message.user }}</span>
                    <span class="text-gray-500 dark:text-gray-400 ml-2">{{ message.time }}</span>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ message.text }}</p>
                </div>
              </div>
            </div>
            <div class="mt-4">
              <div class="flex space-x-2">
                <input 
                  v-model="newMessage"
                  @keyup.enter="sendMessage"
                  type="text" 
                  placeholder="Type a message..."
                  class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <BaseButton @click="sendMessage" size="sm">
                  <PaperAirplaneIcon class="w-4 h-4" />
                </BaseButton>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>

      <!-- All Channels -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BaseCard 
          v-for="channel in allChannels" 
          :key="channel.id"
          hover
          clickable
          @click="selectedChannel = channel"
        >
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
              <span class="text-white font-bold">{{ channel.mentor.charAt(0) }}</span>
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-gray-900 dark:text-white">{{ channel.name }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ channel.mentor }}</p>
              <div class="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>{{ channel.students }} students</span>
                <span>⭐ {{ channel.rating }}</span>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { PlayIcon, PaperAirplaneIcon } from '@heroicons/vue/24/solid'
import BaseCard from '../components/UI/BaseCard.vue'
import BaseButton from '../components/UI/BaseButton.vue'

export default {
  name: 'MentorChannels',
  components: {
    PlayIcon,
    PaperAirplaneIcon,
    BaseCard,
    BaseButton
  },
  setup() {
    const selectedChannel = ref(null)
    const newMessage = ref('')

    const featuredChannels = [
      {
        id: 1,
        name: 'Advanced Mathematics',
        mentor: 'Dr. Sarah Johnson',
        subject: 'Mathematics',
        description: 'Master calculus, algebra, and advanced mathematical concepts',
        students: 1247,
        videos: 45,
        rating: 4.9,
        recentVideos: [
          { id: 1, title: 'Calculus Integration Techniques', description: 'Learn advanced integration methods', duration: '15:30', views: 523, date: '2 days ago' },
          { id: 2, title: 'Linear Algebra Foundations', description: 'Understanding vectors and matrices', duration: '22:15', views: 687, date: '1 week ago' },
          { id: 3, title: 'Differential Equations', description: 'Solving first-order differential equations', duration: '18:45', views: 432, date: '1 week ago' }
        ],
        assignments: [
          { id: 1, title: 'Integration Practice Set', description: 'Complete 20 integration problems', dueDate: 'Dec 25, 2024', status: 'not_started' },
          { id: 2, title: 'Linear Algebra Quiz', description: 'Test your understanding of vectors', dueDate: 'Dec 28, 2024', status: 'pending' },
          { id: 3, title: 'Calculus Project', description: 'Real-world application of calculus', dueDate: 'Jan 5, 2025', status: 'completed' }
        ]
      },
      {
        id: 2,
        name: 'Physics Fundamentals',
        mentor: 'Prof. Michael Chen',
        subject: 'Physics',
        description: 'Explore mechanics, thermodynamics, and electromagnetism',
        students: 892,
        videos: 38,
        rating: 4.8,
        recentVideos: [
          { id: 1, title: 'Newton\'s Laws of Motion', description: 'Understanding force and acceleration', duration: '12:20', views: 765, date: '3 days ago' },
          { id: 2, title: 'Thermodynamics Basics', description: 'Heat, work, and energy transfer', duration: '19:10', views: 543, date: '5 days ago' }
        ],
        assignments: [
          { id: 1, title: 'Motion Problems', description: 'Solve kinematics problems', dueDate: 'Dec 22, 2024', status: 'pending' },
          { id: 2, title: 'Energy Conservation Lab', description: 'Virtual lab experiment', dueDate: 'Dec 30, 2024', status: 'not_started' }
        ]
      },
      {
        id: 3,
        name: 'Chemistry Mastery',
        mentor: 'Dr. Emily Rodriguez',
        subject: 'Chemistry',
        description: 'From basic concepts to advanced organic chemistry',
        students: 654,
        videos: 42,
        rating: 4.7,
        recentVideos: [
          { id: 1, title: 'Organic Chemistry Basics', description: 'Introduction to carbon compounds', duration: '16:40', views: 432, date: '1 day ago' },
          { id: 2, title: 'Chemical Bonding', description: 'Understanding molecular structures', duration: '14:25', views: 598, date: '4 days ago' }
        ],
        assignments: [
          { id: 1, title: 'Molecular Structure Quiz', description: 'Test on chemical bonding', dueDate: 'Dec 24, 2024', status: 'completed' },
          { id: 2, title: 'Organic Reactions', description: 'Practice reaction mechanisms', dueDate: 'Dec 27, 2024', status: 'not_started' }
        ]
      }
    ]

    const allChannels = [
      ...featuredChannels,
      { id: 4, name: 'English Literature', mentor: 'Ms. Jessica Taylor', subject: 'English', students: 432, rating: 4.6 },
      { id: 5, name: 'World History', mentor: 'Mr. David Wilson', subject: 'History', students: 356, rating: 4.5 },
      { id: 6, name: 'Computer Science', mentor: 'Dr. Alex Kumar', subject: 'Programming', students: 789, rating: 4.9 }
    ]

    const chatMessages = [
      { id: 1, user: 'Alice', text: 'Great explanation of integration by parts!', time: '10:30 AM' },
      { id: 2, user: 'Bob', text: 'Can you clarify the substitution method?', time: '10:32 AM' },
      { id: 3, user: 'Dr. Sarah Johnson', text: 'Sure! Let me explain with another example.', time: '10:35 AM' },
      { id: 4, user: 'Charlie', text: 'This is really helpful, thank you!', time: '10:37 AM' },
      { id: 5, user: 'Diana', text: 'When is the next live session?', time: '10:40 AM' }
    ]

    const sendMessage = () => {
      if (newMessage.value.trim()) {
        chatMessages.push({
          id: Date.now(),
          user: 'You',
          text: newMessage.value,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        })
        newMessage.value = ''
      }
    }

    return {
      selectedChannel,
      newMessage,
      featuredChannels,
      allChannels,
      chatMessages,
      sendMessage
    }
  }
}
</script>