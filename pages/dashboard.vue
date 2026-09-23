<script setup lang="ts">
import { useApi } from '~/composables/useApi'
import StatsCards from '~/components/dashboard/statsCards.vue'
import OrdersChart from '~/components/dashboard/ordersChart.vue'
import RecentOrders from '~/components/dashboard/recentOrders.vue'
import RecentUsers from '~/components/dashboard/recentUsers.vue'

definePageMeta({
    layout: 'default',
    middleware: 'admin'
})

const data = useApi()

const users = ref<any[]>([])
const orders = ref<any[]>([])
const loading = ref(false)

const stats = computed(() => {
    const totalUsers = users.value.length
    const totalOrders = orders.value.length
    const totalRevenue = orders.value.reduce((sum, order) => sum + (order.amount || 0), 0)
  
    return { totalUsers, totalOrders, totalRevenue }
})

const fetchDashboardData = async () => {
    loading.value = true
    
    try {
        const [usersData, ordersData] = await Promise.all([
            <any> data.getUsers(),
            <any> data.getOrders()
        ])

        users.value = usersData
        orders.value = ordersData
    } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchDashboardData()
})
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
        <div class="max-w-7xl mx-auto">
      
            <!-- Header -->
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-800">
                    Dashboard
                </h1>
                <p class="text-gray-500 mt-1">
                    Welcome back! Here's what's happening today.
                </p>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex items-center justify-center py-20">
                <div class="text-center">
                    <div class="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p class="text-gray-500">
                        Loading dashboard data...
                    </p>
                </div>
            </div>

            <!-- Dashboard Content -->
            <div v-else class="space-y-6">
        
                <!-- Stats Cards -->
                <StatsCards :total-users="stats.totalUsers" :total-orders="stats.totalOrders" :total-revenue="stats.totalRevenue"/>

                <!-- Charts and Recent Data -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
                    <!-- Orders Chart (2/3 width) -->
                    <div class="lg:col-span-2">
                        <OrdersChart />
                    </div>

                    <!-- Recent Orders (1/3 width) -->
                    <div class="lg:col-span-1">
                        <RecentOrders :orders="orders" />
                    </div>
                </div>

                <!-- Recent Users -->
                <RecentUsers :users="users"/>
            </div>
        </div>
    </div>
</template>