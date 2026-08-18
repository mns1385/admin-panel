<script setup>
    import {Menu, Bell, CircleUserRound} from 'lucide-vue-next'
    import {ref} from 'vue'
    import { useSidebarStore } from '~/stores/sidebar'

    let isMenuOpen = ref(false)
    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value
    }

    const goToProfile = () => {
        navigateTo('/profile')
        isMenuOpen.value = false
    }

    const sidebarStore = useSidebarStore()
</script>

<template>
    <header class="h-16 border-b border-gray-200 bg-white px-6">
        <div class="flex h-full items-center justify-between">

            <!-- title page -->
            <div class="flex items-center gap-4">
                <h1 class="text-xl font-bold text-gray-800">
                    Admin Panel
                </h1>
                <button class="p-2 hover:bg-gray-100 md:hidden" @click="sidebarStore.toggle()">
                    <Menu size="20"/>
                </button>
            </div>

            <!-- right -->
            <div class="flex items-center gap-4">
                <!-- Mobile Menu Button -->
                <div class="relative sm:hidden">
                    <button type="button" @click="toggleMenu" class="rounded-lg p-2 text-gray-600 hover:bg-gray-100" aria-label="Open menu">
                        <CircleUserRound size="25"/>
                    </button>

                    <div v-if="isMenuOpen" class="absolute right-0 top-full mt-2 min-w-36 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                        <button @click="goToProfile" class="block w-full rounded-md px-4 py-2 text-left hover:bg-gray-100">
                            Profile
                        </button>

                        <button class="block w-full rounded-md px-4 py-2 text-left hover:bg-gray-100">
                            Logout
                        </button>
                    </div>
                </div>

                <!-- Notification -->
                <button type="button" class="relative rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700" aria-label="Notification">
                    <Bell size="20"/>
                    <span class="absolute right-1 top-6 h-2 w-2 rounded-full bg-red-500"></span>
                </button>

                <!-- User -->
                <div class="flex items-center gap-3">
                    <div class="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                        A
                    </div>
                    <div class="hidden sm:block">
                        <p class="text-sm font-semibold text-gray-800">
                            Admin
                        </p>
                        <p class="text-xs text-gray-500">Administrator</p>
                    </div>
                </div>

                <!-- Profile-->
                <NuxtLink to="/profile" class="hidden rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 sm:block">
                    Profile
                </NuxtLink>

                <!-- Logout -->
                <button type="button" class="hidden rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition bg-red-100 hover:bg-red-500 hover:text-white sm:block">
                    Logout
                </button>
            </div>
        </div>
    </header>
</template>