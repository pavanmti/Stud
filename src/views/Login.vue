<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <!-- Background Pattern -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 dark:bg-primary-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200 dark:bg-accent-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
    </div>

    <!-- Theme Toggle - Floating -->
    <button
      @click="toggleTheme"
      class="fixed top-6 right-6 z-20 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
    >
      <SunIcon v-if="isDark" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
      <MoonIcon v-else class="w-5 h-5 text-gray-600 dark:text-gray-400" />
    </button>

    <!-- Main Content -->
    <div class="relative flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
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

        <!-- Auth Options -->
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">Get Started Today</h2>
            <p class="text-gray-600 dark:text-gray-400">Choose your role to access personalized features</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Student Options -->
            <BaseCard hover class="text-center p-8">
              <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AcademicCapIcon class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">I'm a Student</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-6">Track your studies, manage tasks, and achieve your academic goals</p>
              <div class="space-y-3">
                <BaseButton @click="showStudentSignUp = true" class="w-full bg-blue-600 hover:bg-blue-700">
                  Sign Up as Student
                </BaseButton>
                <BaseButton @click="showStudentLogin = true" variant="outline" class="w-full border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                  Sign In as Student
                </BaseButton>
              </div>
            </BaseCard>

            <!-- Mentor Options -->
            <BaseCard hover class="text-center p-8">
              <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserIcon class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2">I'm a Mentor</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-6">Guide students, create content, and share your expertise</p>
              <div class="space-y-3">
                <BaseButton @click="showMentorSignUp = true" class="w-full bg-purple-600 hover:bg-purple-700">
                  Apply as Mentor
                </BaseButton>
                <BaseButton @click="showMentorLogin = true" variant="outline" class="w-full border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                  Sign In as Mentor
                </BaseButton>
              </div>
            </BaseCard>
          </div>
        </div>
      </div>
    </div>

    <!-- Student Sign Up Modal -->
    <div v-if="showStudentSignUp" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-8 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        <button
          @click="showStudentSignUp = false"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <XMarkIcon class="w-6 h-6" />
        </button>

        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <AcademicCapIcon class="w-8 h-8 text-white" />
          </div>
          <h2 class="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">Create Student Account</h2>
          <p class="text-gray-600 dark:text-gray-400">Join StudTrack and start your learning journey</p>
        </div>

        <form @submit.prevent="handleStudentSignUp" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
              <input
                v-model="studentSignUpForm.firstName"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="John"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
              <input
                v-model="studentSignUpForm.lastName"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Doe"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
            <input
              v-model="studentSignUpForm.email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="john.doe@example.com"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <div class="relative">
              <input
                v-model="studentSignUpForm.password"
                :type="showStudentSignUpPassword ? 'text' : 'password'"
                required
                class="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Create a strong password"
              />
              <button
                type="button"
                @click="showStudentSignUpPassword = !showStudentSignUpPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <EyeIcon v-if="!showStudentSignUpPassword" class="h-5 w-5 text-gray-400" />
                <EyeSlashIcon v-else class="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
            <div class="relative">
              <input
                v-model="studentSignUpForm.confirmPassword"
                :type="showStudentConfirmPassword ? 'text' : 'password'"
                required
                class="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                @click="showStudentConfirmPassword = !showStudentConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <EyeIcon v-if="!showStudentConfirmPassword" class="h-5 w-5 text-gray-400" />
                <EyeSlashIcon v-else class="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Grade Level</label>
            <select
              v-model="studentSignUpForm.gradeLevel"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Select Grade Level</option>
              <option value="9">9th Grade</option>
              <option value="10">10th Grade</option>
              <option value="11">11th Grade</option>
              <option value="12">12th Grade</option>
              <option value="college">College</option>
              <option value="graduate">Graduate</option>
            </select>
          </div>
          <div class="flex items-center">
            <input
              v-model="studentSignUpForm.agreeToTerms"
              type="checkbox"
              required
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              I agree to the <a href="#" class="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</a> and <a href="#" class="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>
            </label>
          </div>
          <BaseButton type="submit" :loading="isStudentSignUpLoading" class="w-full bg-blue-600 hover:bg-blue-700">
            Create Student Account
          </BaseButton>
        </form>

        <div class="mt-6 text-center">
          <p class="text-gray-600 dark:text-gray-400">
            Already have an account?
            <button @click="showStudentSignUp = false; showStudentLogin = true" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>

    <!-- Student Sign In Modal -->
    <div v-if="showStudentLogin" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-8 w-full max-w-md relative">
        <button
          @click="showStudentLogin = false"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <XMarkIcon class="w-6 h-6" />
        </button>

        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <AcademicCapIcon class="w-8 h-8 text-white" />
          </div>
          <h2 class="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">Student Sign In</h2>
          <p class="text-gray-600 dark:text-gray-400">Welcome back! Access your study dashboard</p>
        </div>

        <form @submit.prevent="handleStudentLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
            <input
              v-model="studentLoginForm.email"
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
                v-model="studentLoginForm.password"
                :type="showStudentLoginPassword ? 'text' : 'password'"
                required
                class="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter your password"
              />
              <button
                type="button"
                @click="showStudentLoginPassword = !showStudentLoginPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <EyeIcon v-if="!showStudentLoginPassword" class="h-5 w-5 text-gray-400" />
                <EyeSlashIcon v-else class="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                v-model="studentLoginForm.rememberMe"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>
            <button type="button" class="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              Forgot Password?
            </button>
          </div>
          <BaseButton type="submit" :loading="isStudentLoginLoading" class="w-full bg-blue-600 hover:bg-blue-700">
            Sign In
          </BaseButton>
        </form>

        <div class="mt-6 text-center">
          <p class="text-gray-600 dark:text-gray-400">
            Don't have an account?
            <button @click="showStudentLogin = false; showStudentSignUp = true" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>

    <!-- Mentor Sign Up Modal -->
    <div v-if="showMentorSignUp" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-8 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        <button
          @click="showMentorSignUp = false"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <XMarkIcon class="w-6 h-6" />
        </button>

        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserIcon class="w-8 h-8 text-white" />
          </div>
          <h2 class="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">Apply as Mentor</h2>
          <p class="text-gray-600 dark:text-gray-400">Share your expertise and guide students</p>
        </div>

        <form @submit.prevent="handleMentorSignUp" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
              <input
                v-model="mentorSignUpForm.firstName"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Dr. Jane"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
              <input
                v-model="mentorSignUpForm.lastName"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Smith"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
            <input
              v-model="mentorSignUpForm.email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="jane.smith@university.edu"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <div class="relative">
              <input
                v-model="mentorSignUpForm.password"
                :type="showMentorSignUpPassword ? 'text' : 'password'"
                required
                class="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Create a strong password"
              />
              <button
                type="button"
                @click="showMentorSignUpPassword = !showMentorSignUpPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <EyeIcon v-if="!showMentorSignUpPassword" class="h-5 w-5 text-gray-400" />
                <EyeSlashIcon v-else class="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
            <div class="relative">
              <input
                v-model="mentorSignUpForm.confirmPassword"
                :type="showMentorConfirmPassword ? 'text' : 'password'"
                required
                class="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                @click="showMentorConfirmPassword = !showMentorConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <EyeIcon v-if="!showMentorConfirmPassword" class="h-5 w-5 text-gray-400" />
                <EyeSlashIcon v-else class="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject Expertise</label>
            <select
              v-model="mentorSignUpForm.subject"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Select Your Expertise</option>
              <option value="mathematics">Mathematics</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="biology">Biology</option>
              <option value="english">English Literature</option>
              <option value="history">History</option>
              <option value="computer-science">Computer Science</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Years of Experience</label>
            <select
              v-model="mentorSignUpForm.experience"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Select Experience</option>
              <option value="1-2">1-2 years</option>
              <option value="3-5">3-5 years</option>
              <option value="6-10">6-10 years</option>
              <option value="10+">10+ years</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Brief Bio</label>
            <textarea
              v-model="mentorSignUpForm.bio"
              rows="3"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Tell us about your background and teaching experience..."
            ></textarea>
          </div>
          <div class="flex items-center">
            <input
              v-model="mentorSignUpForm.agreeToTerms"
              type="checkbox"
              required
              class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              I agree to the <a href="#" class="text-purple-600 dark:text-purple-400 hover:underline">Mentor Terms</a> and <a href="#" class="text-purple-600 dark:text-purple-400 hover:underline">Code of Conduct</a>
            </label>
          </div>
          <BaseButton type="submit" :loading="isMentorSignUpLoading" class="w-full bg-purple-600 hover:bg-purple-700">
            Submit Application
          </BaseButton>
        </form>

        <div class="mt-6 text-center">
          <p class="text-gray-600 dark:text-gray-400">
            Already have an account?
            <button @click="showMentorSignUp = false; showMentorLogin = true" class="text-purple-600 dark:text-purple-400 hover:underline font-medium">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>

    <!-- Mentor Sign In Modal -->
    <div v-if="showMentorLogin" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-8 w-full max-w-md relative">
        <button
          @click="showMentorLogin = false"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <XMarkIcon class="w-6 h-6" />
        </button>

        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserIcon class="w-8 h-8 text-white" />
          </div>
          <h2 class="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">Mentor Sign In</h2>
          <p class="text-gray-600 dark:text-gray-400">Welcome back! Access your mentor dashboard</p>
        </div>

        <form @submit.prevent="handleMentorLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
            <input
              v-model="mentorLoginForm.email"
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
                v-model="mentorLoginForm.password"
                :type="showMentorLoginPassword ? 'text' : 'password'"
                required
                class="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter your password"
              />
              <button
                type="button"
                @click="showMentorLoginPassword = !showMentorLoginPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <EyeIcon v-if="!showMentorLoginPassword" class="h-5 w-5 text-gray-400" />
                <EyeSlashIcon v-else class="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                v-model="mentorLoginForm.rememberMe"
                type="checkbox"
                class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>
            <button type="button" class="text-sm text-purple-600 dark:text-purple-400 hover:underline">
              Forgot Password?
            </button>
          </div>
          <BaseButton type="submit" :loading="isMentorLoginLoading" class="w-full bg-purple-600 hover:bg-purple-700">
            Sign In
          </BaseButton>
        </form>

        <div class="mt-6 text-center">
          <p class="text-gray-600 dark:text-gray-400">
            Don't have an account?
            <button @click="showMentorLogin = false; showMentorSignUp = true" class="text-purple-600 dark:text-purple-400 hover:underline font-medium">
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
    
    // Modal visibility states
    const showStudentSignUp = ref(false)
    const showStudentLogin = ref(false)
    const showMentorSignUp = ref(false)
    const showMentorLogin = ref(false)
    
    // Password visibility states
    const showStudentSignUpPassword = ref(false)
    const showStudentConfirmPassword = ref(false)
    const showStudentLoginPassword = ref(false)
    const showMentorSignUpPassword = ref(false)
    const showMentorConfirmPassword = ref(false)
    const showMentorLoginPassword = ref(false)
    
    // Loading states
    const isStudentSignUpLoading = ref(false)
    const isStudentLoginLoading = ref(false)
    const isMentorSignUpLoading = ref(false)
    const isMentorLoginLoading = ref(false)

    // Form data
    const studentSignUpForm = ref({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      gradeLevel: '',
      agreeToTerms: false
    })

    const studentLoginForm = ref({
      email: '',
      password: '',
      rememberMe: false
    })

    const mentorSignUpForm = ref({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      subject: '',
      experience: '',
      bio: '',
      agreeToTerms: false
    })

    const mentorLoginForm = ref({
      email: '',
      password: '',
      rememberMe: false
    })

    // Form handlers
    const handleStudentSignUp = async () => {
      if (studentSignUpForm.value.password !== studentSignUpForm.value.confirmPassword) {
        alert('Passwords do not match!')
        return
      }
      
      isStudentSignUpLoading.value = true
      
      // Simulate API call
      setTimeout(() => {
        console.log('Student sign up:', studentSignUpForm.value)
        isStudentSignUpLoading.value = false
        alert('Account created successfully! Please sign in.')
        showStudentSignUp.value = false
        showStudentLogin.value = true
        
        // Reset form
        studentSignUpForm.value = {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          gradeLevel: '',
          agreeToTerms: false
        }
      }, 2000)
    }

    const handleStudentLogin = async () => {
      isStudentLoginLoading.value = true
      
      // Simulate API call
      setTimeout(() => {
        console.log('Student login:', studentLoginForm.value)
        isStudentLoginLoading.value = false
        // Redirect to student dashboard
        window.location.href = '/dashboard'
      }, 2000)
    }

    const handleMentorSignUp = async () => {
      if (mentorSignUpForm.value.password !== mentorSignUpForm.value.confirmPassword) {
        alert('Passwords do not match!')
        return
      }
      
      isMentorSignUpLoading.value = true
      
      // Simulate API call
      setTimeout(() => {
        console.log('Mentor sign up:', mentorSignUpForm.value)
        isMentorSignUpLoading.value = false
        alert('Application submitted successfully! We will review and contact you soon.')
        showMentorSignUp.value = false
        
        // Reset form
        mentorSignUpForm.value = {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          subject: '',
          experience: '',
          bio: '',
          agreeToTerms: false
        }
      }, 2000)
    }

    const handleMentorLogin = async () => {
      isMentorLoginLoading.value = true
      
      // Simulate API call
      setTimeout(() => {
        console.log('Mentor login:', mentorLoginForm.value)
        isMentorLoginLoading.value = false
        // Redirect to mentor dashboard
        window.location.href = '/dashboard'
      }, 2000)
    }

    return {
      isDark,
      toggleTheme,
      showStudentSignUp,
      showStudentLogin,
      showMentorSignUp,
      showMentorLogin,
      showStudentSignUpPassword,
      showStudentConfirmPassword,
      showStudentLoginPassword,
      showMentorSignUpPassword,
      showMentorConfirmPassword,
      showMentorLoginPassword,
      isStudentSignUpLoading,
      isStudentLoginLoading,
      isMentorSignUpLoading,
      isMentorLoginLoading,
      studentSignUpForm,
      studentLoginForm,
      mentorSignUpForm,
      mentorLoginForm,
      handleStudentSignUp,
      handleStudentLogin,
      handleMentorSignUp,
      handleMentorLogin
    }
  }
}
</script>