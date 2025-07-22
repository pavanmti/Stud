<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">Profile & Settings</h1>
        <p class="text-gray-600 dark:text-gray-400">Customize your StudTrack experience</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Profile Info -->
        <div class="lg:col-span-1">
          <BaseCard>
            <div class="text-center">
              <div class="relative mb-4">
                <div class="w-24 h-24 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-white font-bold text-2xl">{{ profile.initials }}</span>
                </div>
                <button class="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow">
                  <CameraIcon class="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-1">{{ profile.name }}</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">{{ profile.email }}</p>
              <div class="grid grid-cols-2 gap-4 text-center">
                <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">{{ profile.level }}</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">Level</div>
                </div>
                <div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div class="text-2xl font-bold text-success-600 dark:text-success-400">{{ profile.streak }}</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
                </div>
              </div>
            </div>
          </BaseCard>

          <!-- Quick Stats -->
          <BaseCard class="mt-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">Total Study Time</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ profile.totalStudyTime }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">Tasks Completed</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ profile.tasksCompleted }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">Badges Earned</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ profile.badgesEarned }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400">Favorite Subject</span>
                <span class="font-medium text-gray-900 dark:text-white">{{ profile.favoriteSubject }}</span>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Settings -->
        <div class="lg:col-span-2">
          <div class="space-y-6">
            <!-- Personal Information -->
            <BaseCard>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>
              <form class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                    <input 
                      v-model="profile.firstName"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                    <input 
                      v-model="profile.lastName"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input 
                    v-model="profile.email"
                    type="email"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                  <textarea 
                    v-model="profile.bio"
                    rows="3"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  ></textarea>
                </div>
                <div class="flex justify-end">
                  <BaseButton>Save Changes</BaseButton>
                </div>
              </form>
            </BaseCard>

            <!-- Preferences -->
            <BaseCard>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preferences</h3>
              <div class="space-y-4">
                <!-- Theme Toggle -->
                <div class="flex items-center justify-between">
                  <div>
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</label>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Choose your preferred theme</p>
                  </div>
                  <button
                    @click="toggleTheme"
                    class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    :class="isDark ? 'bg-primary-600' : 'bg-gray-200'"
                  >
                    <span
                      class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                      :class="isDark ? 'translate-x-6' : 'translate-x-1'"
                    ></span>
                  </button>
                </div>

                <!-- Notifications -->
                <div class="space-y-3">
                  <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Notifications</label>
                  <div class="space-y-2">
                    <div v-for="notification in notifications" :key="notification.id" class="flex items-center justify-between">
                      <div>
                        <span class="text-sm text-gray-700 dark:text-gray-300">{{ notification.label }}</span>
                        <p class="text-xs text-gray-500 dark:text-gray-400">{{ notification.description }}</p>
                      </div>
                      <button
                        @click="notification.enabled = !notification.enabled"
                        class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        :class="notification.enabled ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'"
                      >
                        <span
                          class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                          :class="notification.enabled ? 'translate-x-6' : 'translate-x-1'"
                        ></span>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Language & Timezone -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Language</label>
                    <select 
                      v-model="profile.language"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Timezone</label>
                    <select 
                      v-model="profile.timezone"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="UTC">UTC</option>
                      <option value="EST">Eastern Time</option>
                      <option value="PST">Pacific Time</option>
                      <option value="GMT">Greenwich Mean Time</option>
                    </select>
                  </div>
                </div>
              </div>
            </BaseCard>

            <!-- Study Goals -->
            <BaseCard>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Study Goals</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Daily Study Goal (hours)</label>
                  <input 
                    v-model="profile.dailyGoal"
                    type="number"
                    min="1"
                    max="12"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Study Time</label>
                  <div class="grid grid-cols-2 gap-4">
                    <select 
                      v-model="profile.preferredStudyTime.start"
                      class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="06:00">6:00 AM</option>
                      <option value="07:00">7:00 AM</option>
                      <option value="08:00">8:00 AM</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                    </select>
                    <select 
                      v-model="profile.preferredStudyTime.end"
                      class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="20:00">8:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>
            </BaseCard>

            <!-- Account Actions -->
            <BaseCard>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Actions</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Export Data</span>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Download your study data and progress</p>
                  </div>
                  <BaseButton variant="outline" size="sm">Export</BaseButton>
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Change Password</span>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Update your account password</p>
                  </div>
                  <BaseButton variant="outline" size="sm">Change</BaseButton>
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-sm font-medium text-error-600 dark:text-error-400">Delete Account</span>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Permanently delete your account and data</p>
                  </div>
                  <BaseButton variant="danger" size="sm">Delete</BaseButton>
                </div>
              </div>
            </BaseCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { CameraIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '../composables/useTheme'
import BaseCard from '../components/UI/BaseCard.vue'
import BaseButton from '../components/UI/BaseButton.vue'

export default {
  name: 'Profile',
  components: {
    CameraIcon,
    BaseCard,
    BaseButton
  },
  setup() {
    const { isDark, toggleTheme } = useTheme()

    const profile = ref({
      firstName: 'John',
      lastName: 'Doe',
      name: 'John Doe',
      email: 'john.doe@example.com',
      bio: 'Passionate student focused on mathematics and science. Always eager to learn and improve.',
      initials: 'JD',
      level: 7,
      streak: 12,
      totalStudyTime: '127h',
      tasksCompleted: 248,
      badgesEarned: 24,
      favoriteSubject: 'Mathematics',
      language: 'en',
      timezone: 'EST',
      dailyGoal: 6,
      preferredStudyTime: {
        start: '08:00',
        end: '18:00'
      }
    })

    const notifications = ref([
      { id: 1, label: 'Study Reminders', description: 'Get notified when it\'s time to study', enabled: true },
      { id: 2, label: 'Task Deadlines', description: 'Receive alerts for upcoming deadlines', enabled: true },
      { id: 3, label: 'Achievement Notifications', description: 'Celebrate when you earn new badges', enabled: true },
      { id: 4, label: 'Weekly Reports', description: 'Get weekly progress summaries', enabled: false },
      { id: 5, label: 'Mentor Messages', description: 'Notifications from your mentors', enabled: true }
    ])

    return {
      isDark,
      toggleTheme,
      profile,
      notifications
    }
  }
}
</script>