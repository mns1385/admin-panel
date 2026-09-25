<script setup lang="ts">
import { Package } from 'lucide-vue-next'

const props = defineProps<{
    orders: any[]
}>()

const orders = computed(() => props.orders)

const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount)
}

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    })
}

const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
        pening: 'bg-yellow-100 text-yellow-700',
        processing: 'bg-blue-100 text-blue-700',
        delivered: 'bg-green-100 text-green-700',
        cancelled: 'bg-red-100 text-red-700'
    }

    return colors[status] || 'bg-gray-100 text-gray-700'
}

const viewAll = () => {
    navigateTo('/orders')
}
</script>

<template>
    <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div class="flex items-center justify-between mb-6">
            <div>
                <h3 class="text-lg font-bold text-gray-800">
                    Recent Orders
                </h3>
                <p class="text-sm text-gray-500 m-1">
                    Latest 5 orders
                </p>
            </div>
            <button @click="viewAll()"
            class="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All
            </button>
        </div>

        <div class="space-y-3">
            <div v-for="order in orders.slice(0, 5)" :key="order.id"
            class="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 lex items-center justify-center text-white">
                        <Package class="w-5 h-5" />
                    </div>
                    <div>
                        <p class="font-medium text-gray-800 text-sm">
                            Order #{{ order.id }}
                        </p>
                        <p class="text-xs text-gray-500">
                            {{ formatDate(order.date) }}
                        </p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="text-right">
                        <p class="font-semibold text-gray-800 text-sm">
                            {{ formatAmount(order.amount) }}
                        </p>
                        <span :cass="['inline-block px-2 py-0.5 rounded-md text-xs font-semibold', getStatusColor(order.status)]">
                            {{ order.status }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>