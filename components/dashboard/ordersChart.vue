<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

const props = defineProps<{
    orders: any[]
}>()

const chartData = computed(() => {
    const dateToday = new Date()
    dateToday.setHours(0, 0, 0, 0)

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const last7Days = Array.from({length: 7}, (_,i) => {
        const date = new Date(dateToday)
        date.setDate(dateToday.getDate() - (6 - i))

        return {
            label: days[date.getDay()],
            dateStr: date.toISOString().split("T")[0],
            count: 0
        }
    })

    props.orders.forEach(order => {
        const orderDate = order.date?.split("T")[0]
        const dayData = last7Days.find(d => d.dateStr === orderDate)
        if (dayData) {
            dayData.count++
        }
    })

    return {
        labels: last7Days.map(d => d.label),
        datasets: [
            {
            label: 'Orders',
            data: last7Days.map(d => d.count),
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#3B82F6',
            poitBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
            }
        ]
    }
})

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            backgroundColor: '#1F2937',
            titleColor: '#fff',
            bodColor: '#fff',
            padding: 12,
            cornerRadius: 8,
            displayColors: false
        }
    },

    scales: {
        y: {
            beginAtZero: true,
            grid: {
                color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
                color: '#6B7280'
            }
        },

        x: {
            grid: {
                display: false
            },
            ticks: {
                color: '#6B7280'
            }
        }
    }
})
</script>

<template>
    <div class="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div class="mb-6">
            <h3 class="txt-lg font-bold text-gray-800">
                Order Trends
            </h3>
            <p class="text-sm text-gray-500 mt-1">
                Orders over the last 7 days
            </p>
        </div>
        <div class="h-80">
            <Line :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>