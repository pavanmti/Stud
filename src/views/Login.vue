<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <!-- Background Pattern -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 dark:bg-primary-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200 dark:bg-accent-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
    </div>

    <!-- Main Content -->
    <div class="relative flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <!-- Theme Toggle - Floating -->
      <button
        @click="toggleTheme"
        class="fixed top-6 right-6 z-20 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
      >
        <SunIcon v-if="isDark" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <MoonIcon v-else class="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </button>

      <div class="w-full max-w-6xl">
        <!-- Hero Section -->
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-6xl font-display font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            Welcome to <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">StudTrack</span>
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 animate-slide-up">
            Your comprehensive study companion that helps you track progress, manage tasks, and achieve your academic goals with gamified learning and expert mentorship.
          </p>
        </div>

        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <BaseCard hover class="text-center">
            <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ClockIcon class="w-6 h-6 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Smart Study Timer</h3>
            <p class="text-gray-600 dark:text-gray-400">Focus with Pomodoro technique and track your study sessions with detailed analytics</p>
          </BaseCard>

          <BaseCard hover class="text-center">
            <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrophyIcon class="w-6 h-6 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Gamified Learning</h3>
            <p class="text-gray-600 dark:text-gray-400">Earn badges, level up, and compete with peers to stay motivated</p>
          </BaseCard>

          <BaseCard hover class="text-center">
            <div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <UserGroupIcon class="w-6 h-6 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Expert Mentorship</h3>
            <p class="text-gray-600 dark:text-gray-400">Connect with experienced mentors and access curated learning resources</p>
          </BaseCard>
        </div>

        <!-- Login Options -->
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">Get Started Today</h2>
            <p class="text-gray-600 dark:text-gray-400">Choose your role to access personalized features</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Student Login -->
            <BaseCard hover clickable @click="showStudentLogin = true" class="text-center p-8">
              <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AcademicCapIcon class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">I'm a Student</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-6">Track your studies, manage tasks, and achieve your academic goals</p>
              <div class="text-primary-600 dark:text-primary-400 font-medium">Sign In as Student →</div>
            </BaseCard>

            <!-- Mentor Login -->
            <BaseCard hover clickable @click="showMentorLogin = true" class="text-center p-8">
              <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserIcon class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">I'm a Mentor</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-6">Guide students, create content, and share your expertise</p>
              <div class="text-primary-600 dark:text-primary-400 font-medium">Sign In as Mentor →</div>
            </BaseCard>
          </div>
        </div>
      </div>
    </div>

    <!-- Student Login Modal -->
    <div v-if="showStudentLogin" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-8 w-full max-w-md relative">
        <button
          @click="showStudentLogin = false"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <XMarkIcon class="w-6 h-6" />
        </button>

        <!-- Student Login Form -->
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <AcademicCapIcon class="w-8 h-8 text-white" />
          </div>
          <h2 class="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">Student Sign In</h2>
          <p class="text-gray-600 dark:text-gray-400">Access your study dashboard</p>
        </div>

        <form @submit.prevent="handleStudentLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
            <input
              v-model="studentForm.email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <div class="relative">
              <input
                v-model="studentForm.password"
                :type="showStudentPassword ? 'text' : 'password'"
                required
                class="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter your password"
              />
              <button
                type="button"
                @click="showStudentPassword = !showStudentPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <EyeIcon v-if="!showStudentPassword" class="h-5 w-5 text-gray-400" />
                <EyeSlashIcon v-else class="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
          <div class="flex justify-end">
            <button type="button" class="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              Forgot Password?
            </button>
          </div>
          <BaseButton type="submit" :loading="isStudentLoading" class="w-full bg-blue-600 hover:bg-blue-700">
            Sign In as Student
          </BaseButton>
        </form>

        <div class="mt-6 text-center">
          <p class="text-gray-600 dark:text-gray-400">
            Don't have an account?
            <button class="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              Sign Up as Student
            </button>
          </p>
        </div>
      </div>
    </div>

    <!-- Mentor Login Modal -->
    <div v-if="showMentorLogin" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-8 w-full max-w-md relative">
        <button
          @click="showMentorLogin = false"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <XMarkIcon class="w-6 h-6" />
        </button>

        <!-- Mentor Login Form -->
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserIcon class="w-8 h-8 text-white" />
          </div>
          <h2 class="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">Mentor Sign In</h2>
          <p class="text-gray-600 dark:text-gray-400">Access your mentor dashboard</p>
        </div>

        <form @submit.prevent="handleMentorLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
            <input
              v-model="mentorForm.email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <div class="relative">
              <input
                v-model="mentorForm.password"
                :type="showMentorPassword ? 'text' : 'password'"
                required
                class="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter your password"
              />
              <button
                type="button"
                @click="showMentorPassword = !showMentorPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <EyeIcon v-if="!showMentorPassword" class="h-5 w-5 text-gray-400" />
                <EyeSlashIcon v-else class="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
          <div class="flex justify-end">
            <button type="button" class="text-sm text-purple-600 dark:text-purple-400 hover:underline">
              Forgot Password?
            </button>
          </div>
          <BaseButton type="submit" :loading="isMentorLoading" class="w-full bg-purple-600 hover:bg-purple-700">
            Sign In as Mentor
          </BaseButton>
        </form>

        <div class="mt-6 text-center">
          <p class="text-gray-600 dark:text-gray-400">
            Don't have an account?
            <button class="text-purple-600 dark:text-purple-400 hover:underline font-medium">
              Apply as Mentor
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { 
  SunIcon, 
  MoonIcon, 
  ClockIcon, 
  TrophyIcon, 
  UserGroupIcon, 
  AcademicCapIcon, 
  UserIcon,
  XMarkIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/vue/24/outline'
import { useTheme } from '../composables/useTheme'
import BaseCard from '../components/UI/BaseCard.vue'
import BaseButton from '../components/UI/BaseButton.vue'

export default {
  name: 'Login',
  components: {
    SunIcon,
    MoonIcon,
    ClockIcon,
    TrophyIcon,
    UserGroupIcon,
    AcademicCapIcon,
    UserIcon,
    XMarkIcon,
    EyeIcon,
    EyeSlashIcon,
    BaseCard,
    BaseButton
  },
  setup() {
    const { isDark, toggleTheme } = useTheme()
    
    const showStudentLogin = ref(false)
    const showMentorLogin = ref(false)
    const showStudentPassword = ref(false)
    const showMentorPassword = ref(false)
    const isStudentLoading = ref(false)
    const isMentorLoading = ref(false)

    const studentForm = ref({
      email: '',
      password: ''
    })

    const mentorForm = ref({
      email: '',
      password: ''
    })

    const handleStudentLogin = async () => {
      isStudentLoading.value = true
      
      // Simulate API call
      setTimeout(() => {
        console.log('Student login:', studentForm.value)
        isStudentLoading.value = false
        // Redirect to student dashboard
        window.location.href = '/dashboard'
      }, 2000)
    }

    const handleMentorLogin = async () => {
      isMentorLoading.value = true
      
      // Simulate API call
      setTimeout(() => {
        console.log('Mentor login:', mentorForm.value)
        isMentorLoading.value = false
        // Redirect to mentor dashboard (you can create a separate mentor dashboard)
        window.location.href = '/dashboard'
      }, 2000)
    }

    return {
      isDark,
      toggleTheme,
      showStudentLogin,
      showMentorLogin,
      showStudentPassword,
      showMentorPassword,
      isStudentLoading,
      isMentorLoading,
      studentForm,
      mentorForm,
      handleStudentLogin,
      handleMentorLogin
    }
  }
}
</script>