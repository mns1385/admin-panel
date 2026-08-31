<script setup lang="ts">
    import { ref } from 'vue'
    import { useAuthStore } from '~/stores/auth'
    const authStore = useAuthStore()

    const email = ref('')
    const username = ref('')
    const password = ref('')
    
    const emailError = ref('')
    const usernameError = ref('')
    const passwordError = ref('')

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const message = ref('')
    const isLoading = ref(false)

    const sendCode = async () => {
        emailError.value = ''
        passwordError.value = ''
        usernameError.value = ''

        if (!email.value) {
            emailError.value = 'Email is required'
        } else if (!isValidEmail(email.value)) {
            emailError.value = 'Please enter a valid email'
        }

        if (!username.value) {
            usernameError.value = 'User name is required'
        }

        if (!password.value) {
            passwordError.value = 'Password is required'
        } else if (password.value.length < 8) {
            passwordError.value = 'Password must be at least 8 characters'
        }

        if (passwordError.value || emailError.value || usernameError.value) {
            return
        }

        isLoading.value = true

        try {
            const response = await $fetch('/api/auth/send-code', {
                method: 'POST',
                body: {
                    email: email.value,
                    username: username.value,
                    password: password.value
                }
            })

            if (response.success) {
                authStore.sendingCode(email.value)
            }
            
        } catch (error: any) {
            if (error.statusCode === 400) {
                message.value = error.statusMessage
            } else if (error.statusCode === 500) {
                message.value = error.statusMessage
            }
        }

        isLoading.value = false
    }
</script>

<template>
    <form @submit.prevent ="sendCode">
        <div class="mb-4">
            <label for="email" class="mb-2 block text-xl font-medium text-white text-left">
                Email :
            </label>
            <input type="email" name="email" id="email" placeholder="Enter your email"
            v-model="email"
            class="block rounded-lg w-full text-xl px-4 py-1 ">
            <p v-if="emailError" class="mt-2 text-sm text-red-400">
                {{ emailError }}
            </p>
        </div>

        <div class="mb-4">
            <label for="username" class="mb-2 block text-xl font-medium text-white text-left">
                UserName :
            </label>
            <input type="text" name="username" id="username" placeholder="Enter your username"
            v-model="username"
            class="block rounded-lg w-full text-xl px-4 py-1 ">
            <p v-if="usernameError" class="mt-2 text-sm text-red-400">
                {{ usernameError }}
            </p>
        </div>

        <div class="mb-4">
            <label for="password" class="mb-2 block text-xl font-medium text-white text-left">
                Password :
            </label>
            <input type="password" name="password" id="password" placeholder="Enter your password"
            v-model="password"
            class="block rounded-lg w-full text-xl px-4 py-1 ">
            <p v-if="passwordError" class="mt-2 text-sm text-red-400">
                {{ passwordError }}
            </p>
        </div>

        <button type="submit"
        class="w-40 text-white text-xl bg-blue-500 rounded-full p-2 hover:bg-blue-600 active:bg-blue-700">
            {{ isLoading? 'Loading...': 'send code' }}
        </button>

        <p v-if="message" class="mt-2 text-sm text-red-400">
            {{ message }}
        </p>
    </form>
</template>