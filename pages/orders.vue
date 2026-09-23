<script setup lang="ts">
import { useApi } from '~/composables/useApi'
import { Package, Search, Filter, Eye, Loader2 } from 'lucide-vue-next'
import OrderModal from '~/components/orders/orderModal.vue'

definePageMeta({
  layout: 'default',
  middleware: 'admin'
})

const data = useApi()

const allOrders = ref<any[]>([])
const loading = ref(false)
const searchQuery = ref('')
const statusFilter = ref<'all' | 'pending' | 'processing' | 'delivered' | 'cancelled'>('all')

// مودال
const selectedOrder = ref<any>(null)
const isOpenModal = ref(false)

const orders = computed(() => {
    return allOrders.value.filter((order) => {
        const matchesSearch = order.productName.toLowerCase().includes(searchQuery.value.toLowerCase()) || order.id.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesStatus = statusFilter.value === 'all' || order.status === statusFilter.value
    
        return matchesSearch && matchesStatus
  })
})

const stats = computed(() => {
    const total = allOrders.value.length
    const pending = allOrders.value.filter(o => o.status === 'pending').length
    const delivered = allOrders.value.filter(o => o.status === 'delivered').length
    const totalRevenue = allOrders.value.reduce((sum, o) => sum + (o.amount || 0), 0)
  
    return { total, pending, delivered, totalRevenue }
})

const fetchOrders = async () => {
    loading.value = true
    
    try {
        allOrders.value = await <any>data.getOrders()
    } catch (error) {
        console.error('Failed to fetch rders:', error)
    } finally {
        loading.value = false
    }
}

const openModal = (order: any) => {
    selectedOrder.value = order
    isOpenModal.value = true
}

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
        processing: 'bg-blue-100 text-blue-700 borde-blue-200',
        delivered: 'bg-green-100 text-green-700 border-green-200',
        cancelled: 'bg-red-100 text-red-700 border-red-200'
    }

    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200'
}

onMounted(() => {
    fetchOrders()
})
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
        <div class="max-w-7xl mx-auto">
      
            <!-- Header -->
            <div class="mb-6">
                <h1 class="text-3xl font-bold text-gray-800 flex ites-center gap-2">
                    <Package class="w-8 h-8 text-blue-600" />
                    Orders Management
                </h1>
                <p class="text-gray-500 mt-1">
                    Manage and track all customer orders
                </p>
            </div>

            <!-- Statistics Cards -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500 mb-1">Totl Orders</p>
                            <p class="text-2xl font-bold text-gray-800">{{ stats.total }}</p>
                        </div>
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Package class="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gry-500 mb-1">
                                Pending
                            </p>
                            <p class="text-2xl font-bold text-yellow-600">
                                {{ stats.pending }}
                            </p>
                        </div>
                        <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                            <span class="text-2xl">⏳</span>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm txt-gray-500 mb-1">
                                Delivered
                            </p>
                            <p class="text-2xl font-bold text-green-600">
                                {{ stats.delivered }}
                            </p>
                        </div>
                        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <span class="text-2xl">✅</span>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="ext-sm text-gray-500 mb-1">
                                Total Revenue
                            </p>
                            <p class="text-2xl font-bold text-purple-600">
                                {{ formatAmount(stats.totalRevenue) }}
                            </p>
                        </div>
                        <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <span class="text-2xl">💰</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
                <div class="flex flex-col md:flex-row gap-4">

                    <!--Search Input-->
                    <div class="flex-1 relative">
                        <Search class="absolute right-4 top-2.5 w-5 h-5 text-gray-400"/>
                        <input type="text" v-model="searchQuery" placeholder="Search by name or Id..."
                        class="w-full pr-10 pl-12 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                        <button v-if="searchQuery" @click="searchQuery = ''"
                        class="absolute left-4 top-2.5 p-1 hover:bg-gray-100 rounded-full transition-colors">
                            <X class="w-4 h-4 text-gray-500"/>
                        </button>
                    </div>

                    <!--Role Filter-->
                    <div class="relative md:w-48">
                        <Filter class="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none"/>
                        <select v-model="statusFilter"
                        class="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white appearance-none cursor-pointer">
                            <option value="all">
                                All Status
                            </option>
                            <option value="pending">
                                Pending
                            </option>
                            <option value="processing">
                                Procesing
                            </option>
                            <option value="delivered">
                                Delivered
                            </option>
                            <option value="cancelled">
                                Cancelled
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Orders Table -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        
                <div v-if="loading" class="p-12 text-center">
                    <Loader2 class="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
                    <p class="text-gray-500">Loading orders..</p>
                </div>

                <div v-else-if="orders.length === 0" class="p-12 text-center">
                    <Package class="w-16 h-16 text-gray-300 mx-auto mb-3" />
                    <p class="text-gray-500">
                        No orders found
                    </p>
                </div>

                <!-- Desktop Table -->
                <div v-else-if="!loading" class="hidden md:block overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">product</th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">amount</th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">date</th>
                                <th class="px-6 py-4 text-left textxs font-semibold text-gray-600 uppercase">status</th>
                                <th class="px-6 py-4 text-left textxs font-semibold text-gray-600 uppercase">action</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50 transition-colors">
                                <td class="px-6 py-4">
                                    <span class="font-mono font-semibold text-gray-700">#{{ order.id }}</span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="font-mono font-semibold text-gray-700">{{ order.productName }}</span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="font-semibold text-gray-800">{{ formatAmount(order.amount) }}</span>
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-600">
                                    {{ formatDate(order.date) }}
                                </td>
                                <td class="px-6 py-4">
                                    <span :class="['px-3 py-1.5 rounded-lg border text-sm font-medium', getStatusColor(order.status)]">
                                        {{ order.status }}
                                    </span>
                                </td>
                                <td class="px-6 py-3">
                                    <button @click="openModal(order)"
                                    class=" text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Eye class="w-6 h-6" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Mobile Cards -->
                <div v-else-if="!loading" class="md:hidden divide-y divide-gray-200">
                    <div v-for="order in orders" :key="order.id" class="p-4">
                        <div class="flex items-start justify-between mb-3">        
                            <span :class="['px-3 py-1 rounded-full text-xs font-semibold border', getStatusColor(order.status)]">
                                {{ order.status }}
                            </span>
                            </div>
                            <div class="space-y-2 mb-3">
                                <p class="text-sm text-gray-600">
                                    <span class="font-medium">Amount:</span> {{ formatAmount(order.amount) }}
                                </p>
                                <p class="text-sm text-gray-600">
                                    <span class="font-medium">Date:</span> {{ formatDate(order.date) }}
                                </p>
                            </div>
                            <button @click="openModal(order)" class="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                                <Eye class="w-4 h-4"/>
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        <!-- Order Details Modal Component -->
        <OrderModal v-model="isOpenModal" :order="selectedOrder" @success="fetchOrders()"/>
    </div>
</template>