<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div class="w-full max-w-md bg-white rounded-lg shadow-md p-6">
            <h1 class="text-2xl font-bold text-center mb-6">
                Login
            </h1>

            <form class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-1">
                        Username
                    </label>

                    <input type="text" class="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter username"/>
                </div>

                <div>
                    <label class="block text-sm font-medium mb-1">
                        Password
                    </label>

                    <input type="password" class="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter password"/>
                </div>

                <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                    Login
                </button>
            </form>
        </div>
    </div>
</template>