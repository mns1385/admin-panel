<script setup lang="ts">
import { User, Shield } from 'lucide-vue-next'

const props = defineProps<{
    users: any[]
}>()

const users = computed(() => props.users)

const viewAll = () => {
    navigateTo('/users')
}
</script>

<template>
    <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h3 class="text-lg font-bold text-gray-800">
                    Recent Users
                </h3>
                <p class="text-sm text-gray-500 mt-1">
                    Latest 5 registered users
                </p>
            </div>
            <button @click="viewAll()"
            class="text-sm text-blue-600 hover:text-blue-700 fnt-medium">
                View All
            </button>
        </div>

        <div class="space-y-3">
            <div v-for="user in users.slice(0, 5)" :key="user.id"
            class="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        {{ user.name.charAt(0).toUpperCase() }}
                    </div>
                    <div>
                        <p class="font-medium text-gray-800 text-sm">
                            {{ user.name }}
                        </p>
                        <p class="text-xs text-gray-500">
                            {{ user.email }}
                        </p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <span :class="['inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold',
                    user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700']">
                        <component :is="user.role === 'admin' ? Shield : User" class="w-3 h-3" />
                        {{ user.role }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>