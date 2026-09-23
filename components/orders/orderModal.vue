<script setup lang="ts">
import { X, Loader2, User, ShoppingBag, Calendar, DollarSign, Package, Hash } from 'lucide-vue-next'
import { useApi } from '~/composables/useApi'

const props = defineProps<{
    modelValue: boolean
    order: any
}>()

const emit = defineEmits(['update:modelValue', 'success'])

const data = useApi()

// State برای اطلاعات کاربر
const customerInfo = ref<any>({ name: 'Loading...', email: '' })
const loadingCustomer = ref(false)

const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

const closeModal = () => {
    isOpen.value = false
}

// دریافت اطلاعات کاربر وقتی مودال باز می‌شود
watch(() => [props.modelValue, props.order?.userId], async ([isOpen, userId]) => {
    if (isOpen && userId) {
        loadingCustomer.value = true
        customerInfo.value = { name: 'Loading...', email: '' }
      
        try {
            const user = await data.getUser(userId)
            customerInfo.value = user || { name: 'Unknown User', email: '' }
        } catch (error) {
            console.error('Failed to fetch customer:', error)
            customerInfo.value = { name: 'Unknown User', email: '' }
        } finally {
            loadingCustomer.value = false
        }
    }
})

const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount)
}

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        processing: 'bg-blue-100 text-blue-700 border-blue-200',
        delivered: 'bg-green-100 text-green-700 border-green-200',
        cancelled: 'bg-red-100 text-red-700 border-red-200'
    }

    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200'
}

const getStatusIcon = (status: string) => {
    const icons: Record<string, string> = {
        pending: '⏳',
        processing: '🔄',
        delivered: '✅',
        cancelled: '❌'
    }

    return icons[status] || '📦'
}

const handleStatusChange = async (event: Event) => {
    const newStatus = (event.target as HTMLSelectElement).value
    
    if (props.order) {

        props.order.status = newStatus
        try {
            await data.updateOrder(props.order.id, props.order)
            emit('success')

        } catch (error) {
            console.error('Failed to update status:', error)
        }
    }
}
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div  @click.self="closeModal" class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        
                    <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg z-10 overflow-hidden">
          
                    <!-- Header با گرادیانت -->
                    <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                        <div class="flex items-enter justify-between">
                            <div class="flex items-center gap-3">
                                <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                    <Package class="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 class="text-xl font-bold">
                                        Order Details
                                    </h3>
                                    <p class="text-sm text-white/80 mt-0.5">
                                        Order #{{ order?.id }}
                                    </p>
                                </div>
                            </div>

                            <button @click="closeModal" type="button"
                            class="p-2 hover:bg-white/20 rounded-lg transition-colors">
                                <X class="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="p-6 space-y-5">
            
                        <!-- بخش ۱: اطلاعات مشتری -->
                        <div>
                            <div class="flex items-center gap-2 mb-3">
                                <User class="w-4 h-4 text-blue-600" />
                                <h4 class="text-sm font-semiold text-gray-700 uppercase tracking-wide">
                                    Customer Information
                                </h4>
                            </div>
              
                            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                                <div v-if="loadingCustomer" class="flex items-center gap-2 text-blue-600">
                                    <Loader2 class="w-4 h-4 animate-spin" />
                                    <span class="text-sm">
                                        Loading customer info...
                                    </span>
                                </div>
                                <div v-else class="flex items-cener gap-3">
                                    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                                        {{ customerInfo.name?.charAt(0)?.toUpperCase() || '?' }}
                                    </div>
                                    <div class="flex-1">
                                        <p class="font-semibold text-gray-800">
                                            {{ customerInfo.name }}
                                        </p>
                                        <p class="text-sm text-gray-600">
                                            {{ customerInfo.email }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- بخش : اطلاعات کالا -->
                        <div>
                            <div class="flex items-center gap-2 mb-3">
                                <ShoppingBag class="w-4 h-4 text-purple-600" />
                                <h4 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                    Product Details
                                </h4>
                            </div>
              
                            <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                                <div class="flex items-center gap-3">
                                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
                                        <Package class="w-6 h-6" />
                                    </div>
                                    <div class="flex-1">
                                        <p class="font-semibold text-gray-800">
                                            {{ order?.productName || 'Unknown Product' }}
                                        </p>
                                        <div class="flex items-center gap-2 mt-1">
                                            <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 rounded-md text-xs font-semibold">
                                                <Hash class="w-3 h-3" />
                                                Qty: {{ order?.quantity || 0 }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- بخش ۳: مبلغ و تاریخ -->
                        <div class="grid grid-cols-2 gap-3">
                            <div class="bg-gradient-to-br from-gren-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                                <div class="flex items-center gap-2 mb-2">
                                    <DollarSign class="w-4 h-4 text-green-600" />
                                    <p class="text-xs font-semibold text-gray-600 uppercase">
                                        Amount
                                    </p>
                                </div>
                                <p class="text-xl font-bold text-gray-800">
                                    {{ formatAmount(order?.amount || 0) }}
                                </p>
                            </div>
              
                            <div class="bg-gradient-to-br from-orange-50 to-amber-50 rounde-xl p-4 border border-orange-100">
                                <div class="flex items-center gap-2 mb-2">
                                    <Calendar class="w-4 h-4 text-orange-600" />
                                    <p class="text-xs font-semibold text-gray-600 uppercase">
                                        Date
                                    </p>
                                </div>
                                <p class="text-sm font-semibold text-gray-800">
                                    {{ formatDate(order?.date || '') }}
                                </p>
                            </div>
                        </div>

                        <!-- بخش ۴: وضعیت -->
                        <div>
                            <div class="flex items-center gap-2mb-3">
                                <Package class="w-4 h-4 text-indigo-600" />
                                <h4 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                    Order Status
                                </h4>
                            </div>
              
                            <select :value="order?.status" @change="handleStatusChange" 
                            :class="['w-full px-4 py-3 rounded-xl border-2 text-base font-semibold cursor-pointer transition-all', 
                            getStatusColor(order?.status || 'pendng')]">
                                <option value="pending">⏳ Pending</option>
                                <option value="processing">🔄 Processing</option>
                                <option value="delivered">✅ Delivered</option>
                                <option value="cancelled">❌ Cancelled</option>
                            </select>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
                        <button @click="closeModal" type="button"
                        class="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg">
                            Close
                        </button>
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