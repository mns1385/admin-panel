<script setup lang="ts">
import { useDashboardStore } from '~/stores/dashboard'
import StatsCards from '~/components/dashboard/StatsCards.vue'
import OrdersChart from '~/components/dashboard/OrdersChart.vue'
import RecentOrders from '~/components/dashboard/RecentOrders.vue'
import RecentUsers from '~/components/dashboard/RecentUsers.vue'

definePageMeta({
    layout: 'default',
    middleware: 'auth'
})

const dashboardStore = useDashboardStore()

const loading = ref(false)

onMounted(async () => {
    loading.value = true
    await dashboardStore.fetchDashboardData()
    loading.value = false
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

            <!-- Dashboard Content -->
            <div class="space-y-6">
        
                <!-- Stats Cards -->
                <StatsCards :total-users="dashboardStore.totalUsers" :total-orders="dashboardStore.totalOrders" :total-revenue="dashboardStore.totalRevenue"/>

                <!-- Charts and Recent Data -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
                    <!-- Orders Chart (2/3 width) -->
                    <div class="lg:col-span-2">
                        <OrdersChart />
                    </div>

                    <!-- Recent Orders (1/3 width) -->
                    <div class="lg:col-span-1">
                        <RecentOrders :orders="dashboardStore.orders" />
                    </div>
                </div>

                <!-- Recent Users -->
                <RecentUsers :users="dashboardStore.users"/>
            </div>
        </div>
    </div>
</template>