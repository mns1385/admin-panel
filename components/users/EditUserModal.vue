<script setup lang="ts">
import { useApi } from '~/composables/useApi'
import { Loader2, UserIcon, Shield, XCircle, CheckCircle2, X, Save} from 'lucide-vue-next'

const props = defineProps<{
    modelValue: boolean,
    user: any
}>()

const emit = defineEmits(['update:modelValue', 'success'])

const data = useApi()

const form = ref({
    name: '',
    role: 'user'
})

const message = ref('')
const isError = ref(false)
const loading = ref(false)

const closeModal = () => {
    emit('update:modelValue', false)
    resetAll()
}

const resetAll = () => {
    form.value = {
        name: '',
        role: 'user'
    }
    message.value = ''
    isError.value = false
}

watch([() => props.modelValue, () => props.user], ([isOpen, user]) => {
    if (isOpen && user) {
        form.value = {
            name: user.name || '',
            role: user.role || 'user'
        }
    }
})

const handleSave = async () => {
    message.value = ''
    isError.value = false

    if (!form.value.name) {
        message.value = 'Name is required!'
        isError.value = true
        return
    }

    loading.value = true

    props.user.name = form.value.name
    props.user.role = form.value.role

    try {
        await data.updateUser(props.user.id, props.user)

        message.value = 'User update successfully!'

        setTimeout(() => {
            resetAll()
            closeModal()
            emit('success')
        }, 2000)
    } catch (error: any) {
        message.value = error.message
        isError.value = true
    } finally {
        loading.value = false
    }
}
</script>

<template>
<Teleport to="body">
    <Transition name="modal">
        <div v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeModal"></div>

            <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10">

                <!--Header-->
                <div class="flex items-center justify-between mb-6">
                    <div>
                        <h3 class="text-xl font-bold text-gray-800">
                            Edite User
                        </h3>
                        <p class="text-sm text-gray-500 mt-1">
                            Update user information
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
                    <component :is="isError? XCircle: CheckCircle2" class="w-4 h-4 flex-shrink-0"/>
                    {{ message }}
                </div>

                <!--Form Edit-->
                <form @submit.prevent="handleSave" class="space-y-4">

                    <!--Name-->
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                            Name :
                        </label>
                        <input v-model="form.name" type="text" placeholder="Enter full name" :disabled="loading"
                        class="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transpatent outline-none transition-all">
                    </div>

                    <!--Role-->
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
                            <Save v-else class="w-4 h-4"/>
                            <span>
                                {{ loading? 'Saving': 'Save & Update' }}
                            </span>
                        </button>
                    </div>
                </form>
            </div>

        </div>
    </Transition>
</Teleport>
</template>