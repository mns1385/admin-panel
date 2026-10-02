<script setup lang="ts">
import { Shield, Users, Package, BarChart3, ArrowRight, CheckCircle2, Sparkles } from 'lucide-vue-next'

definePageMeta({
    layout: "auth",
    middleware: "guest"
})

const features = [
    {
        icon: Users,
        title: 'User Management',
        description: 'Complete CRUD operations for managing users, roles, and prmissions efficiently.',
        color: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-600'
    },
    {
        icon: Package,
        title: 'Order Tracking',
        description: 'Real-time order management with status updates, filtering, and detailed history.',
        color: 'from-purple-500 to-pink-500',
        bgColor: 'bg-purple-50',
        iconColor: 'text-purple-600'
    },
    {
        icon: BarChart3,
        title: 'Advanced Analytics',
        description: 'Beautiful interactive charts and insights o track revenue, growth, and metrics.',
        color: 'from-orange-500 to-red-500',
        bgColor: 'bg-orange-50',
        iconColor: 'text-orange-600'
    }
]

const benefits = [
    'Secure authentication & route protection',
    'Responsive design for all devices',
    'Real-time data synchronization',
    'Clean and maintainable architecture'
]
</script>

<template>
    <div class="min-h-screen bg-white">
    
        <!-- Navbar -->
        <nav class="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-5">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <Shield class="w-5 h-5 text-white" />
                        </div>
                        <span class="text-xl font-bold text-gray-900">
                            Admin<span class="text-indigo-600">Panel</span>
                        </span>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <!-- Background Decorations -->
            <div class="absolute top-0 left-1/2 translate-x-1/2 w-full h-full max-w-7xl pointer-events-non">
                <div class="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div class="absolute top-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div class="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div class="max-w-4xl mx-auto text-center relative z-10">
                <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-sm font-medium text-indigo-700 mb-6">
                    <Sparkles class="w-4 h-4"/>
                    <span>Professional Admin Dashboard</span>
                </div>
        
                <h1 class="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
                    Manage Your Business <br/>
                    <span class="bg-gradient-to-r from-inigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        With Confidence
                    </span>
                </h1>
        
                <p class="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                    A powerful, intuitive, and beautifully designed admin panel built with Nuxt 3 and Vue 3. 
                    Track orders, manage users, and analyze your data in real-time.
                </p>

                <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <NuxtLink to="/auth/login"
                    class="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2">
                        Get Started
                        <ArrowRight class="w-4 h-4" />
                    </NuxtLink>
                    <a href="#features"
                    class="w-full sm:w-auto px-8 py-3.5 bg-white boder border-gray-200 hover:border-gray-300 text-gray-700 font-semibold rounded-xl transition-all hover:shadow-md flex items-center justify-center gap-2">
                        Learn More
                    </a>
                </div>

                <!-- Benefits -->
                <div class="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3">
                    <div v-for="(benefit, index) in benefits" :key="index" 
                    class="flex items-center gap-2 text-gray-600">
                        <CheckCircle2 class="w-5 h-5 text-green-500" />
                        <span lass="text-sm font-medium">{{ benefit }}</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section id="features" class="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Everything You Need to Succeed
                    </h2>
                    <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                        Packed with owerful features to help you manage your platform efficiently and scale your business.
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div v-for="(feature, index) in features" :key="index"
                    class="group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div :class="['w-14 h-14 rounded-2xl flex items-center justify-cener mb-6 transition-transform group-hover:scale-110', feature.bgColor]">
                            <component :is="feature.icon" :class="['w-7 h-7', feature.iconColor]" />
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3">
                            {{ feature.title }}
                        </h3>
                        <p class="text-gray-600 leading-relaxed">
                            {{ feature.description }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="y-20 px-4 sm:px-6 lg:px-8">
            <div class="max-w-4xl mx-auto">
                <div class="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
                    
                    <!-- Decorative circles -->
                    <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
                    <div clss="relative z-10">
                        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to take control?
                        </h2>
                        <p class="text-indigo-100 text-lg mb-8 max-w-xl mx-auto">
                            Join thousands of administrators who trust our platform to manage their daily operations.
                        </p>
                        <NuxtLink to="/auth/login"
                        class="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-indigo-700 font-semibold rounded-xl hovr:bg-gray-100 transition-all shadow-lg hover:shadow-xl">
                            Login to Dashboard
                            <ArrowRight class="w-4 h-4"/>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-white border-t border-gray-100 py-10 px-4 sm:px-6 lg:px-8">
            <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <div class="flex items-center gap-2">
                    <div class="w-6 h- bg-gradient-to-br from-indigo-600 to-purple-600 rounded-md flex items-center justify-center">
                        <Shield class="w-4 h-4 text-white"/>
                    </div>
                    <span class="text-sm font-semibold text-gray-700">
                        AdminPanel © 2026
                    </span>
                </div>
                <p class="text-sm text-gray-500">
                    Built with Nuxt 3, Vue 3, Pinia & Tailwind CSS
                </p>
            </div>
        </footer>

    </div>
</template>

<style scoped>
/* انیمیشن برای بلاب‌های پس‌زمینه */
@keyframes blob {
  0% { transfor: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}
</style>