<template>
    <aside class="h-screen w-64 bg-gray-900 text-white">
        <div class="p-4">
            <h2 class="text-xl font-bold">Panel</h2>
        </div>

        <nav class="mt-4 text-lg">
            <ul>
                <li v-for="item in menuItems" class="transition px-4 py-2 hover:bg-gray-300 hover:text-black">
                    <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script setup>

const menuItems = [
    {title: 'Dashboard', path: '/'},
    {title: 'Users', path: '/users'},
    {title: 'Products', path: '/products'},
    {title: 'Orders', path: '/orders'},
    {title: 'Analytics', path: '/analytics'},
    {title: 'Settings', path: '/settings'}
]

</script>