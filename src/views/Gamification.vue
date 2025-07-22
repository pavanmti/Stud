<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">Rewards & Achievements</h1>
        <p class="text-gray-600 dark:text-gray-400">Level up your learning journey and earn rewards</p>
      </div>

      <!-- Player Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <BaseCard hover class="text-center">
          <div class="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">Level 7</div>
          <div class="text-gray-600 dark:text-gray-400">Current Level</div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-4">
            <div class="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-300" style="width: 65%"></div>
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400 mt-2">1,300 / 2,000 XP to next level</div>
        </BaseCard>
        <BaseCard hover class="text-center">
          <div class="text-4xl font-bold text-success-600 dark:text-success-400 mb-2">24</div>
          <div class="text-gray-600 dark:text-gray-400">Badges Earned</div>
          <div class="text-sm text-success-600 dark:text-success-400 mt-1">+3 this week</div>
        </BaseCard>
        <BaseCard hover class="text-center">
          <div class="text-4xl font-bold text-warning-600 dark:text-warning-400 mb-2">1,847</div>
          <div class="text-gray-600 dark:text-gray-400">Total XP</div>
          <div class="text-sm text-warning-600 dark:text-warning-400 mt-1">+250 this week</div>
        </BaseCard>
      </div>

      <!-- Recent Achievements -->
      <BaseCard class="mb-8">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Achievements</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="achievement in recentAchievements" :key="achievement.id" class="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg animate-bounce-subtle">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <TrophyIcon class="w-6 h-6 text-white" />
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-gray-900 dark:text-white">{{ achievement.title }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">{{ achievement.description }}</div>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Badge Collection -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Badge Wall -->
        <div class="lg:col-span-2">
          <BaseCard>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Badge Collection</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div v-for="badge in badges" :key="badge.id" class="text-center group">
                <div class="relative">
                  <div 
                    class="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2 transition-all duration-300 group-hover:scale-110"
                    :class="badge.earned ? 'bg-gradient-to-r from-primary-500 to-accent-500' : 'bg-gray-300 dark:bg-gray-600'"
                  >
                    <component :is="badge.icon" class="w-8 h-8 text-white" />
                  </div>
                  <div 
                    v-if="badge.earned" 
                    class="absolute -top-1 -right-1 w-6 h-6 bg-success-500 rounded-full flex items-center justify-center"
                  >
                    <CheckIcon class="w-4 h-4 text-white" />
                  </div>
                </div>
                <div class="text-xs font-medium text-gray-900 dark:text-white">{{ badge.name }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ badge.description }}</div>
                <div v-if="badge.earned" class="text-xs text-success-600 dark:text-success-400 mt-1">+{{ badge.xp }} XP</div>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Progress & Leaderboard -->
        <div class="space-y-6">
          <!-- Weekly Progress -->
          <BaseCard>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Progress</h3>
            <div class="space-y-4">
              <div v-for="goal in weeklyGoals" :key="goal.name" class="space-y-2">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{ goal.name }}</span>
                  <span class="text-sm font-medium text-gray-900 dark:text-white">{{ goal.current }}/{{ goal.target }}</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    class="h-2 rounded-full transition-all duration-300"
                    :class="goal.color"
                    :style="{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }"
                  ></div>
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ goal.reward }}</div>
              </div>
            </div>
          </BaseCard>

          <!-- Leaderboard -->
          <BaseCard>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Class Leaderboard</h3>
            <div class="space-y-3">
              <div v-for="(student, index) in leaderboard" :key="student.id" class="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div class="flex-shrink-0">
                  <div 
                    class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    :class="index === 0 ? 'bg-warning-500 text-white' : index === 1 ? 'bg-gray-400 text-white' : index === 2 ? 'bg-amber-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
                  >
                    {{ index + 1 }}
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-medium text-gray-900 dark:text-white">{{ student.name }}</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Level {{ student.level }}</div>
                </div>
                <div class="text-sm font-medium text-gray-900 dark:text-white">{{ student.xp }} XP</div>
              </div>
            </div>
          </BaseCard>

          <!-- Streak Counter -->
          <BaseCard>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Study Streak</h3>
            <div class="text-center">
              <div class="text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2">🔥 7 Days</div>
              <div class="text-gray-600 dark:text-gray-400 mb-4">Keep it up!</div>
              <div class="flex justify-center space-x-1">
                <div v-for="day in 7" :key="day" class="w-8 h-8 bg-success-500 rounded-full flex items-center justify-center">
                  <CheckIcon class="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  TrophyIcon, 
  CheckIcon, 
  ClockIcon, 
  BookOpenIcon, 
  CalendarIcon, 
  AcademicCapIcon,
  FireIcon,
  StarIcon
} from '@heroicons/vue/24/solid'
import BaseCard from '../components/UI/BaseCard.vue'

export default {
  name: 'Gamification',
  components: {
    TrophyIcon,
    CheckIcon,
    BaseCard
  },
  setup() {
    const recentAchievements = [
      { id: 1, title: 'Study Streak', description: '7 days in a row' },
      { id: 2, title: 'Task Master', description: 'Completed 50 tasks' },
      { id: 3, title: 'Math Wizard', description: '20 hours on math' },
      { id: 4, title: 'Early Bird', description: 'Started before 8 AM' }
    ]

    const badges = [
      { id: 1, name: 'First Step', description: 'Complete first task', icon: CheckIcon, earned: true, xp: 50 },
      { id: 2, name: 'Time Master', description: 'Study for 1 hour', icon: ClockIcon, earned: true, xp: 100 },
      { id: 3, name: 'Bookworm', description: 'Complete 10 tasks', icon: BookOpenIcon, earned: true, xp: 200 },
      { id: 4, name: 'Consistent', description: '3 day streak', icon: CalendarIcon, earned: true, xp: 150 },
      { id: 5, name: 'Scholar', description: 'Reach level 5', icon: AcademicCapIcon, earned: true, xp: 300 },
      { id: 6, name: 'On Fire', description: '7 day streak', icon: FireIcon, earned: true, xp: 400 },
      { id: 7, name: 'Perfectionist', description: '100% task completion', icon: StarIcon, earned: false, xp: 500 },
      { id: 8, name: 'Marathon', description: 'Study for 5 hours', icon: TrophyIcon, earned: false, xp: 600 }
    ]

    const weeklyGoals = [
      { name: 'Study Time', current: 28, target: 35, color: 'bg-primary-500', reward: '+200 XP' },
      { name: 'Tasks Completed', current: 12, target: 15, color: 'bg-success-500', reward: '+150 XP' },
      { name: 'Streak Days', current: 7, target: 7, color: 'bg-warning-500', reward: '+100 XP' },
      { name: 'Quiz Scores', current: 8, target: 10, color: 'bg-accent-500', reward: '+250 XP' }
    ]

    const leaderboard = [
      { id: 1, name: 'You', level: 7, xp: 1847 },
      { id: 2, name: 'Alex Chen', level: 8, xp: 2156 },
      { id: 3, name: 'Sarah Johnson', level: 6, xp: 1643 },
      { id: 4, name: 'Mike Rodriguez', level: 7, xp: 1592 },
      { id: 5, name: 'Emily Davis', level: 6, xp: 1489 }
    ]

    return {
      recentAchievements,
      badges,
      weeklyGoals,
      leaderboard
    }
  }
}
</script>