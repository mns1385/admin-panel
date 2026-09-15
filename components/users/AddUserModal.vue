<script setup lang="ts">
import { X, Plus, Loader2, CheckCircle2, XCircle, Eye, EyeOff, ArrowLeft, Mail } from 'lucide-vue-next'

const props = defineProps<{
    modelValue: boolean
}>()

const emit = defineEmits<{
    (e: 'update: modelValue', value: boolean):void
    (e: 'success'):void
}>()

const step = ref<1 | 2 | 3>(1)

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

const closeModel = () => {
    emit('update: modelValue', false)
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
            step.value = 3
            message.value = 'Verification code sent!'
            isError.value = false
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
                closeModel()
                emit('success')
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
    if (step.value === 3) {
        step.value = 1
        message.value = ''
        isError.value = false
    }
}
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            
            <div v-if="modelValue" @click.self="closeModel"
            class="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

                <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10">

                    <!--Header-->
                    <div class="flex items-center justify-between mb-6">
                        <div>
                            <h3 class="text-xl font-bold text-gray-800">
                                Add New User
                            </h3>
                            <p class="text-sm text-gray-500 mt-1">
                                Step {{ step === 1? '1': '2' }} of  2
                            </p>
                            <button @click="closeModel" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <X class="w-5 h-5 text-gray-500"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </Transition>
    </Teleport>
</template>