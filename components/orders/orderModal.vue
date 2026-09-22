<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { useApi } from '~/composables/useApi';

const data = useApi()

const props = defineProps<{
    modelValue: boolean
    order: any
}>()

const emit = defineEmits(['update:modelValue', 'status-changed'])

const user = computed(() => <any> data.getUser(props.order.userId) || {name: 'user', email: ''})

const closeModal = () => {
    emit('update:modelValue', false)
}

// فرمت کردن مبلغ
const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount)
}

// فرمت کردن تاریخ
const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

// دریافت رنگ وضعیت
const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        processing: 'bg-blue-100 text-blue-700 border-blue-200',
        delivered: 'bg-green-100 text-green-700 border-green-200',
        cancelled: 'bg-red-100 text-red-700 border-red-200'
    }

    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200'
}

const isLoading = ref(false)
const isError = ref(false)
const message = ref('')

// تغییر وضعیت
const handleStatusChange = async (event: Event) => {
    message.value = ''
    isError.value = false
    
    const newStatus = (event.target as HTMLSelectElement).value
    props.order.status = newStatus

    isLoading.value = true

    try {
        await data.updateOrder(props.order.id, props.order)
        message.value = `Status of order updated and it is ${newStatus}!`
    } catch (error: any) {
        isError.value = true
        message.value = `${error.statusCode} : ${error.statusMessage}`      
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div class="fixed inset-0 z-50 flex items-center justify-center p-4"
            @click.self="closeModal">
                <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        
                <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 z-10">
          
                    <!-- Header -->
                    <div class="flex items-center justify-between mb-6">
                        <div>
                            <h3 class="text-xl font-bold text-gray-800">
                                Order Details
                            </h3>
                            <p class="text-sm text-gray-500 mt-1">
                                Order #{{ order?.id }}
                            </p>
                        </div>
                        <button @click="closeModal"
                        class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <X class="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    <!-- Order Info -->
                    <div class="space-y-4">
                        <div class="bg-gray-50 rounded-lg p-4">
                            <p class="text-sm text-gray-500 mb-1">
                                Customer
                            </p>
                            <p class="font-semibold text-gray-800">
                                {{ user.name}}
                            </p>
                            <p class="text-sm text-gray-600">
                                {{ user.Email }}
                            </p>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div class="bg-gray-50 rounded-lg p-4">
                                <p class="text-sm text-gray-500 mb-1">
                                    Amount
                                </p>
                                <p class="text-xl font-bold text-gray-800">
                                    {{ formatAmount(order?.amount || 0) }}
                                </p>
                            </div>
                            <div class="bg-gray-50 rounded-lg p-4">
                                <p class="text-sm text-gray-500 mb-1">
                                    Date
                                </p>
                                <p class="font-semibold text-gray-800">
                                    {{ formatDate(order?.date || '') }}
                                </p>
                            </div>
                        </div>

                        <div class="bg-gray-50 rounded-lg p-4">
                            <p class="text-sm text-gray-500 mb-2">
                                Status
                            </p>

                            <select :value="order?.status" @change="handleStatusChange"
                            :class="['w-full px-4 py-2 rounded-lg border text-base font-semibold',
                            getStatusColor(order?.status || 'pending')]">
                                <option value="pending">
                                    ⏳ Pending
                                </option>
                                <option value="processing">
                                    🔄 Processing
                                </option>
                                <option value="delivered">
                                    ✅ Delivered
                                </option>
                                <option value="cancelled">
                                    Cancelled
                                </option>
                            </select>
                        </div>

                        <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <p class="text-sm text-blue-800">
                                <span class="font-semibold">User ID:</span> {{ order?.userId }}
                            </p>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="mt-6">
                        <button @click="closeModal"
                        class="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-all">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>