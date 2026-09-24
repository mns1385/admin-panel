<script setup lang="ts">
import { Users, Package, DollarSign, TrendingUp } from 'lucide-vue-next'
import { useDashboardStore } from '~/stores/dashboard'

const props = defineProps<{
    totalUsers: number,
    totalOrders: number,
    totalRevenue: number
}>()

const stats = [
    {
        title: 'Total Users',
        value: props.totalUsers,
        icon: Users,
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-600'
    },
    {
        title: 'Total Orders',
        value: props.totalOrders,
        icon: Package,
        color: 'from-purple-500 to-purle-600',
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-600'
    },
    {
        title: 'Total Revenue',
        value: `$${props.totalRevenue.toString()}`,
        icon: DollarSign,
        color: 'from-green-500 to-green-600',
        bgColor: 'bg-green-100',
        textColor: 'text-green-600'
    },
    {
        title: 'Growth Rate',
        value: '+12.5%',
        icon: TrendingUp,
        color: 'from-orange-500 to-orange-600',
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-600'
    }
]
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="stat in stats"
        class="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
            <div class="flex items-center justify-between mb-4">
                <div :class="['w-12 h-12 rounded-xl flex items-center justify-center', stat.bgColor]">
                    <component :is="stat.icon" :class="['w-6 h-6', stat.textColor]"/>
                </div>
                <span class="text-xs font-semibold text-gray-500 uppercase">
                    Last 7 days
                </span>
            </div>
            <div>
                <p class="text-sm text-gray-500 mb-1">
                    {{ stat.title }}
                </p>
                <p class="text-2xl font-bold text-gray-800">
                    {{ stat.value }}
                </p>
            </div>
        </div>
    </div>
</template>