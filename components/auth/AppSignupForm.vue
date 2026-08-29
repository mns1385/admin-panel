<script setup lang="ts">
    import { ref } from 'vue'

    const email = ref('')

    const sendCode = async () => {
        try {
            const response = await $fetch('/api/auth/send-code', {
                method: 'POST',
                body: {
                    email: email.value
                }
            })
        } catch (error) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Failed to send verificaion'
            })
        }
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
        </div>

        <div class="mb-4">
            <label for="username" class="mb-2 block text-xl font-medium text-white text-left">
                UserName :
            </label>
            <input type="text" name="username" id="username" placeholder="Enter your username"
            class="block rounded-lg w-full text-xl px-4 py-1 ">
        </div>

        <div class="mb-4">
            <label for="password" class="mb-2 block text-xl font-medium text-white text-left">
                Password :
            </label>
            <input type="password" name="password" id="password" placeholder="Enter your password"
            class="block rounded-lg w-full text-xl px-4 py-1 ">
        </div>

        <button type="submit"
        class="w-40 text-white text-xl bg-blue-500 rounded-full p-2 hover:bg-blue-600 active:bg-blue-700">
            send code
        </button>
    </form>
</template>