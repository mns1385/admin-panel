import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'

export const useDashboardStore = defineStore('dashboard', () => {
  // State
  const users = ref<any[]>([])
  const orders = ref<any[]>([])
  
  // Getters (Computed)
  const totalUsers = computed(() => users.value.length)
  const totalOrders = computed(() => orders.value.length)
  const totalRevenue = computed(() => 
    orders.value.reduce((sum: number, order: any) => sum + (order.amount || 0), 0)
  )

  // Actions
  const fetchDashboardData = async () => {
    const api = useApi()
    
    // دریافت همزمان کاربران و سفارشات
    const [usersData, ordersData] = await Promise.all([
      <any>api.getUsers(),
      <any>api.getOrders()
    ])
    
    users.value = usersData
    orders.value = ordersData
  }

  return {
    users,
    orders,
    totalUsers,
    totalOrders,
    totalRevenue,
    fetchDashboardData
  }
})