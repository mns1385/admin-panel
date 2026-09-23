<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'

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

const chartData = ref({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
        label: 'Orders',
        data: [12, 19, 8, 15, 22, 18, 25],
        brderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
    }]
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