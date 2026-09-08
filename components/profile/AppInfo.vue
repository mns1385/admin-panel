<script setup lang="ts">
import { useProfileStore } from '~/stores/profile';
import { Mail, User, Shield, IdCard } from 'lucide-vue-next'

const profileStore = useProfileStore()

const user = computed(() => profileStore.user || {})
</script>

<template>
    <div class="space-y-6">

        <!--Section Header-->
        <div class="flex items-center gap-3 pd-4 border-b border-gray-200">
            <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <User class="w-5 h-5 text-blue-600"/>
            </div>

            <div>
                <h3 class="text-lg font-semibold text-gray-800">
                    Personal information
                </h3>
                <p class="text-sm text-gray-500">
                    View your account details
                </p>
            </div>
        </div>

        <!--info Cards Grid-->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

            <!--New Card-->
            <div class="bg-gradient-to-br from-blue-50 to-white rounded-xl p-5 border border-blue-100 hover:shadow-md transition-all">
                <div class="flex items-start gap-3">
                    <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <User class="w-5 h-5 text-blue-600"/>
                    </div>

                    <div class="flex-1 min-w-0">
                        <p class="text-xs text-gray-500 font-medium mb-1">
                            Full Name
                        </p>
                        <p class="text-base font-semibold text-gray-800 truncate">
                            {{ user.name || 'Not set' }}
                        </p>
                    </div>
                </div>
            </div>

            <!--Email Card-->
            <div class="bg-gradient-to-br from-purple-50 to-white rounded-xl p-5 border border-purple-100 hover:shadow-md transition-all">
                <div class="flex items-start gap-3">
                    <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <Mail class="w-5 h-5 text-purple-600"/>
                    </div>

                    <div class="flex-1 min-w-0">
                        <p class="text-xs text-gray-500 font-medium mb-1">
                            Email Address
                        </p>
                        <p class="text-base font-semibold text-gray-800 truncate">
                            {{ user.email || 'Not set' }}
                        </p>
                    </div>
                </div>
            </div>

            <!--Role Card-->
            <div class="bg-gradient-to-br from-green-50 to-white rounded-xl p-5 border border-green-100 hover:shadow-md transition-all">
                <div class="flex items-start gap-3">
                    <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <Shield class="w-5 h-5 text-green-600"/>
                    </div>

                    <div class="flex-1 min-w-0">
                        <p class="text-xs text-gray-500 font-medium mb-1">
                            Role
                        </p>
                        <span :class="['inline-block px-3 pv-1 rounded-full text-sm font-semibold',
                            user.role === 'admin'? 'bg-purple-100 text-purple-700': 'bg-blue-100 text-blue-700']">
                            {{ user.role === 'admin'? 'Administrator': 'User' }}
                        </span>
                    </div>
                </div>
            </div>

            <!--ID Card-->
            <div class="bg-gradient-to-br from-orange-50 to-white rounded-xl p-5 border border-orange-100 hover:shadow-md transition-all">
                <div class="flex items-start gap-3">
                    <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <IdCard class="w-5 h-5 text-orange-600"/>
                    </div>

                    <div class="flex-1 min-w-0">
                        <p class="text-xs text-gray-500 font-medium mb-1">
                            User ID
                        </p>
                        <p class="text-base font-semibold text-gray-800 truncate">
                            #{{ user.id || 'N/A' }}
                        </p>
                    </div>
                </div>
            </div>

        </div>

        <!--Account Status-->
        <div class="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-200">
            <div class="flex items-center gap-3">
                <div class="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <div>
                    <p class="text-sm font-semibold text-emerald-800">
                        Account Active
                    </p>
                    <p class="text-xs text-emerald-600">
                        Your account is verified and in good standing
                    </p>
                </div>
            </div>
        </div>

    </div>
</template>