<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const authStore = useAuthStore()

const codeLength = 5
const code = ref<string[]>(['','','','',''])

onMounted(() => {
    if (timer) {
        timer
    }
})

onUnmounted(() => {
    clearInterval(timer)
})

const nextInput = (event: Event) => {
    const input = event.target as HTMLInputElement

    input.value = input.value.replace(/\D/g, '')

    if (input.value) {
        const next = input.nextElementSibling as HTMLIFrameElement | null

        next?.focus()
    }
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

const message = ref('')
const classBorder = ref('')
const isLoading = ref(false)

const verifycode = async () => {
    message.value = ''
    classBorder.value = ''
    isLoading.value = true

    try {
        const response = await $fetch('/api/auth/verify-code', {
            method: 'POST',
            body: {
                email: authStore.emailCheck,
                code: code.value.join('')
            }
        })

        message.value = response.message
        clearInterval(timer)
        if (response.success) {
            authStore.login()
            await navigateTo('/')
        }
    } catch (error:any) {
        if (error?.statusCode === 410) {

            message.value = error.statusMessage
            authStore.sendCode = false

        } else if (error?.statusCode === 400) {

            message.value = error.statusMessage
        } else if (error?.statusCode === 500) {

            message.value = error.statusMessage
            classBorder.value = 'border-red-400 ring-2'
            code.value = ['','','','','']
        }
    }

    isLoading.value = false
}

let timeOut = ref(300)
let classTimer = ref('')
const timer = setInterval(() => {
    if (timeOut.value > 0) {
        timeOut.value--
        if (timeOut.value == 30) {
            classTimer.value = 'text-red-400'
        }
    } else {
        clearInterval(timer)
        code.value = ['0', '0', '0', '0', '0']
        verifycode()
    }
}, 1000)
</script>

<template>
    <form @submit.prevent="verifycode">
        <div class="flex justify-center gap-4 my-10">
            <input v-for="(_, index) in codeLength" :key="index" v-model="code[index]"
            @input="nextInput"
            @keydown="previousInput"
            type="text" maxlength="1" inputmode="numeric"
            class="w-8 h-14 text-center text-2xl rounded-lg font-bold border 
            border-lg outline-none border border-gray-400 focus:ring-2 focus:border-blue-500"
            :class="{classBorder}">
        </div>

        <p class="text-gray-300 font-bold text-xl text-center" :class="{classTimer}">
            Time Out:
            <span>
                {{ Math.floor(timeOut / 60) }} : {{ Math.floor(timeOut % 60) }}
            </span>
        </p>

        <button type="submit" 
        class="w-full mt-6 py-3 rounded-full text-white font-semibold bg-blue-500 hover:bg-blue-600 active:bg-blue-700">
            {{isLoading? 'loading..': 'Verify code'}}
        </button>
        <p v-if="message" class="mt-2 text-sm text-red-400">
            {{ message }}
        </p>
    </form>
</template>