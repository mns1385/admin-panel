<script setup lang="ts">
import { X, Plus, Loader2, CheckCircle2, XCircle, Eye, EyeOff, ArrowLeft, Mail, UserIcon, Shield } from 'lucide-vue-next'
import { onMounted, onUnmounted } from 'vue';

const props = defineProps<{
    modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue', 'success'])

const step = ref<1 | 2>(1)

const form = ref({
    email: '',
    name: '',
    password: '',
    role: 'user'
})

const loading = ref(false)
const message = ref('')
const isError = ref(false)
const showPassword = ref(false)
const verifyCode = ref('')

const closeModal = () => {
    message.value = ''
    isError.value = false
    clearInterval(timer)
    resetAll()
    emit('update:modelValue', false)
}

const resetAll = () => {
    step.value = 1
    form.value = {
        email: '',
        name: '',
        password: '',
        role: 'user'
    }

    verifyCode.value = '',
    isError.value = false,
    showPassword.value = false
    timeOut.value = 300
}

watch(() => props.modelValue, (isOpen) => {
    if (isOpen) {
        resetAll()
    }
})

const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const handleSendCode = async () => {
    message.value = ''
    isError.value = false

    if (!form.value.email) {
        message.value = 'Email is required!'
        isError.value = true
        return
    } else if (!isValidEmail(form.value.email)) {
        message.value = 'Please enter valid email!'
        isError.value = true
        return
    }

    if (!form.value.name) {
        message.value = 'Name is required!'
        isError.value = true
        return
    }

    if (!form.value.password) {
        message.value = 'Password is required!'
        isError.value = true
        return
    } else if (form.value.password.length < 8) {
        message.value = 'Password must be at least 8 characters'
        isError.value = true
        return
    }

    loading.value = true

    try {
        const responce = await $fetch<any>('/api/users/send-code', {
            method: 'POST',
            body: form.value
        })

        if (responce.success) {
            step.value = 2
            message.value = 'Verification code sent!'
            isError.value = false
            startTimer()
        }
    } catch (error: any) {
        message.value = error?.statusMessage
        isError.value = true
    } finally {
        loading.value = false
    }
}

const handleVerify = async () => {
    message.value = ''
    isError.value = false

    if (!verifyCode.value) {
        message.value = 'Verification code is required!'
        isError.value = true
        return
    } else if (verifyCode.value.length !== 5) {
        message.value = 'Code must be 5 digits!'
        isError.value = true
        return
    }

    loading.value = true

    try {
        const responce = await $fetch<any>('/api/users/verify-code', {
            method: 'POST',
            body: {
                email: form.value.email,
                code: verifyCode.value
            }
        })

        if (responce.success) {
            message.value = responce.message
            isError.value = false

            setTimeout(() => {
                emit('success')
                resetAll()
                clearInterval(timer)
                closeModal()
            }, 2000)
        }
    } catch (error: any) {
        message.value = `${error.statusCode} : ${error.statusMessage}`
        isError.value = true
    } finally {
        loading.value = false
    }
}

const goBack = () => {
    if (step.value === 2) {
        step.value = 1
        message.value = ''
        isError.value = false
        clearInterval(timer)
        verifyCode.value = ''
    }
}

const timeOut = ref(300)
let timer: any = null

const startTimer = () => {
    timeOut.value = 300
    timer = setInterval(() => {
        timeOut.value--
        if (timeOut.value <= 0) {
            verifyCode.value = '00000'
            handleVerify()
            resetAll()
            clearInterval(timer)
            closeModal()
        }
    }, 1000)
}
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            
            <div v-if="modelValue"
            class="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div @click="closeModal" class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

                <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">

                    <!--Header-->
                    <div class="flex items-center justify-between mb-6">
                        <div>
                            <h3 class="text-xl font-bold text-gray-800">
                                Add New User
                            </h3>
                            <p class="text-sm text-gray-500 mt-1">
                                Step {{ step === 1? '1': '2' }} of  2
                            </p>
                        </div>
                        <button type="button" @click="closeModal" 
                        class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <X class="w-5 h-5 text-gray-500"/>
                        </button>
                    </div>

                    <!--Message-->
                    <div v-if="message" :class="[
                        'p-3 rounded-lg mb-4 text-sm flex items-center gap-2',
                        isError? 'bg-red-50 text-red-700 border border-red-200': 'bg-green-50 text-green-700 border border-green-200'
                    ]">
                        <component :is="isError? XCircle: CheckCircle2"
                        class="w-4 h-4 flex-shrink-0"/>
                        {{ message }}
                    </div>

                    <!--Step 1, Information-->
                    <form v-if="step === 1" @submit.prevent="handleSendCode" class="space-y-4">

                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                                Email :
                            </label>
                            <input v-model="form.email" type="text" placeholder="Enter your email" :disabled="loading"
                            class="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transpatent outline-none transition-all">
                        </div>

                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                                Name :
                            </label>
                            <input v-model="form.name" type="text" placeholder="Enter full name" :disabled="loading"
                            class="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transpatent outline-none transition-all">
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Password :
                            </label>
                            <div class="relative">
                                <input v-model="form.password" :type="showPassword? 'text': 'password'" placeholder="Enter your password" :disabled="loading"
                                class="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transpatent outline-none transition-all">
                                <button @click="showPassword = !showPassword" type="button"
                                class="absolute right-3 top-4 text-gray-500 hover:text-gray-700" tabindex="-1">
                                    <Eye v-if="showPassword" class="w-5 h-5"/>
                                    <EyeOff v-else class="w-5 h-5"/>
                                </button>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-3">
                                Role
                            </label>
                            <div class="grid grid-cols-2 gap-3">

                                <!--User Card-->
                                <label :class="[
                                    'flex flex-col items-center gap-2 p-2 border-2 rounded-xl cursor-pointer transition-all',
                                    form.role === 'user'? 'border-blue-500 bg-blue-50 shadow-md': 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50',
                                ]">
                                    <input v-model="form.role" type="radio" value="user" class="sr-only" :disabled="loading">
                                    <div :class="[
                                        'w-12 h-12 rounded-full flex items-center justify-center transition-all',
                                        form.role === 'user'? 'bg-blue-500': 'bg-gray-200'
                                    ]">
                                        <UserIcon class="w-6 h-6 text-white"/>
                                    </div>
                                    <span :class="[
                                        'font-semibold text-sm',
                                        form.role === 'user'? 'text-blue-700': 'text-gray-700'
                                    ]">
                                        User
                                    </span>
                                    <span class="text-xs text-gray-500 text-center">
                                        Regular access
                                    </span>
                                </label>

                                <!--Admin Card-->
                                <label :class="[
                                    'flex flex-col items-center gap-2 p-2 border-2 rounded-xl cursor-pointer transition-all',
                                    form.role === 'admin'? 'border-purple-500 bg-purple-50 shadow-md': 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50',
                                ]">
                                    <input v-model="form.role" type="radio" value="admin" class="sr-only" :disabled="loading">
                                    <div :class="[
                                        'w-12 h-12 rounded-full flex items-center justify-center transition-all',
                                        form.role === 'admin'? 'bg-purple-500': 'bg-gray-200'
                                    ]">
                                        <Shield class="w-6 h-6 text-white"/>
                                    </div>
                                    <span :class="[
                                        'font-semibold text-sm',
                                        form.role === 'admin'? 'text-purple-700': 'text-gray-700'
                                    ]">
                                        Admin
                                    </span>
                                    <span class="text-xs text-gray-500 text-center">
                                        Full access
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div class="flex gap-3 pt-2">
                            <button type="button" @click="closeModal" :disabled="loading"
                            class="flex-1 px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-all">
                                Cancel
                            </button>
                            <button type="submit" :disabled="loading"
                            class="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all hover:shadow-md flex items-center justify-center gap-2">
                                <Loader2 v-if="loading" class="w-4 h-4 animate-spin"/>
                                <Mail v-else class="w-4 h-4"/>
                                <span>
                                    {{ loading? 'Sending': 'Send Code' }}
                                </span>
                            </button>
                        </div>
                    </form>

                    <!--Verify Code-->
                    <div v-else-if="step === 2" class="space-y-4">

                        <div class="bg-green-50 rounded-lg p-4 border border-green-200">
                            <p class="text-sm text-green-800">
                                A 5-digit code has been sent to <strong class="break-all">{{ form.email }}</strong>
                            </p>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Verification Code
                            </label>
                            <div class="flex items-center justify-between gap-2">
                                <input v-model="verifyCode" type="text" maxlength="5" placeholder="code" :disabled="loading"
                                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-center text-xl tracking-widest font-mono">
                                <div class="py-2 px-3 border border-gray-300 rounded-lg bg-gray-100 text-xl font-semibold text-gray-700">
                                    <p>
                                        {{ Math.floor(timeOut / 60) }} : {{ Math.floor(timeOut % 60) }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="flex gap-3 pt-2">
                            <button @click="goBack" :disabled="loading"
                            class="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-all flex items-center justify-center gap-2">
                                <ArrowLeft class="w-4 h-4"/>
                                <span>
                                    Back
                                </span>
                            </button>
                            <button @click="handleVerify" type="button" :disabled="loading"
                            class="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all hover:shadow-md flex items-center justify-center gap-2">
                                <Loader2 v-if="loading" class="w-4 h-4 animate-spin"/>
                                <CheckCircle2 v-else class="w-4 h-4 "/>
                                <span>
                                    {{ loading? 'Verifying': 'Verify & Create' }}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </Transition>
    </Teleport>
</template>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
.modal-enter-active .elative, .modal-leave-active .relative {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.modal-enter-from .relative, .modal-leave-to .relative {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
}
</style>