<script setup lang="ts">
import {ref} from 'vue'
import { useAuthStore } from '~/stores/auth'
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

const emailError = ref('')
const passwordError = ref('')

const isLoding = ref(false)

const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
 
const handleLogin = () => {
    emailError.value = ''
    passwordError.value = ''

    if (!email.value) {
        emailError.value = 'Email is required'
    } else if (!isValidEmail(email.value)) {
        emailError.value = 'Please enter a valid email'
    }

    if (!password.value) {
        passwordError.value = 'Password is required'
    } else if (password.value.length < 8) {
        passwordError.value = 'Password must be at least 8 characters'
    }

    if (passwordError.value || emailError.value) {
        return
    }

    isLoding.value = true

    authStore.login()

    isLoding.value = false
}
</script>

<template>
    <form class="space-y-5" @submit.prevent="handleLogin">
        <div>
            <label for="email" class="mb-2 block text-xl font-medium text-white text-left">
                Email :
            </label>

            <input id="email" v-model="email" name="email" type="email" placeholder="Enter your email"
            class="block rounded-lg w-full text-xl px-4 py-1 ">

            <p v-if="emailError" class="mt-2 text-sm text-red-400">
                {{ emailError }}
            </p>
        </div>

        <div>
            <label for="password" class="mb-2 block text-xl font-medium text-white text-left">
                Password :
            </label>

            <input type="password" v-model="password" name="password" id="passwprd" placeholder="Enter your password"
            class="block rounded-lg w-full text-xl px-4 py-1 ">

            <p v-if="passwordError" class="mt-2 text-sm text-red-400">
                {{ passwordError }}
            </p>
        </div>

        <button type="submit" class="w-40 text-white text-xl bg-blue-500 rounded-lg p-2 hover:bg-blue-600 active:bg-blue-700">
            {{ isLoding? 'Logging in...': 'Login' }}
        </button>
    </form>
</template>