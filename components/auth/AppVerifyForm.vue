<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const authStore = useAuthStore()

const codeLength = 5
const code = ref('')

const getCode = () => {

    const inputs = document.querySelectorAll(
        'input[data-otp]'
    ) as NodeListOf<HTMLInputElement>

    code.value = Array.from(inputs)
        .map(input => input.value)
        .join('')
}

const nextInput = (event: Event) => {
    const input = event.target as HTMLInputElement

    input.value = input.value.replace(/\D/g, '')

    if (input.value) {
        const next = input.nextElementSibling as HTMLIFrameElement | null

        next?.focus()
    }

    getCode()
}

const previousInput = (event: KeyboardEvent) => {
    const input = event.target as HTMLInputElement

    if (event.key === 'Backspace') {
        if (input.value) {
            input.value = ''
        } else {
            const previous = input.previousElementSibling as HTMLInputElement | null
            previous?.focus()
        }
    }
}

const verifycode = async () => {
    try {
        await $fetch('/api/auth/verify-code', {
            method: 'POST',
            body: {
                email: authStore.emailCheck,
                code: code.value
            }
        })
    } catch (error:any) {
        if (error?.statusCode === 410) {
            authStore.sendCode = false
        }
    }
}
</script>

<template>
    <form @submit.prevent="verifycode">
        <div class="flex justify-center gap-4 my-10">
            <input v-for="(_, index) in codeLength" :key="index"
            @input="nextInput"
            @keydown="previousInput"
            type="text" maxlength="1" inputmode="numeric"
            class="w-8 h-14 text-center text-2xl rounded-lg font-bold border 
            border-lg outline-none border border-gray-400 focus:ring-2 focus:border-blue-500">
        </div>

        <button type="submit" 
        class="w-full mt-6 py-3 rounded-full text-white font-semibold bg-blue-500 hover:bg-blue-600 active:bg-blue-700">
            Verify code
        </button>
    </form>
</template>