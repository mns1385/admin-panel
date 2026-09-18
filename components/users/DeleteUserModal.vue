<script setup lang="ts">
import { useApi } from '~/composables/useApi';
import { X, Trash2, Loader2, XCircle, CheckCircle2, AlertTriangle} from 'lucide-vue-next'

const props = defineProps<{
    modelValue: boolean
    user: any
}>()

const emit = defineEmits(['update:modelValue', 'success'])

const data = useApi()

const loading = ref(false)
const message = ref('')
const isError = ref(false)

const closeModal = () => {
    emit('update:modelValue', false)
    isError.value = false
    message.value = ''
}

const handleDelete = async () => {
    isError.value = false
    message.value = ''

    loading.value = true
    try {
        await data.deleteUser(props.user.id)

        setTimeout(() => {
            message.value = 'Delete the user successfuly!'
            closeModal()
        }, 1000)
    } catch (error: any) {
        message.value = error.statusMessage
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
                
                <div @click="closeModal" class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

                <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10">

                    <!--Header-->
                    <div class="flex items-center justify-between mb-6">
                        <div class="flex items-center gap-3">
                            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                <AlertTriangle class="w-6 h-6 text-red-600"/>
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-gray-800">
                                    Delete User
                                </h3>
                                <p class="text-sm text-gray-500 mt-1">
                                    This action cannot be undone
                                </p>
                            </div>
                        </div>

                        <button @click="closeModal"
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

                    <!--User Info-->
                    <div class="bg-gray-50 rounded-lg p-4 mb-6">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                {{ user?.name.charAt(0).toUpperCase() }}
                            </div>
                            <div>
                                <p class="font-medium text-gray-800">
                                    {{ user?.name }}
                                </p>
                                <p class="text-sm text-gray-500">
                                    {{ user?.email }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!--Buttons-->
                    <div class="flex gap-3">
                        <button type="button" @click="closeModal" :disabled="loading"
                        class="flex-1 px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white font-medium rounded-lg transition-all hover:shadow-md flex items-center justify-center gap-2">
                            No, Cancel
                        </button>
                        <button type="button" @click="handleDelete" :disabled="loading"
                        class="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all hover:shadow-md flex items-center justify-center gap-2">
                            <Trash2 v-if="!loading" class="w-4 h-4"/>
                            <Loader2 v-else class="w-4 h-4 animate-spin"/>
                            <span>
                                {{ loading? 'Deleting': 'Yes, Delete' }}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>