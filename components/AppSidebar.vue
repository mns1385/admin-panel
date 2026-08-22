<script setup lang="ts">
import { useSidebarStore } from '~/stores/sidebar';

const sidebarStore = useSidebarStore()

const menuItems = [
    {title: 'Dashboard', path: '/'},
    {title: 'Users', path: '/users'},
    {title: 'Products', path: '/products'},
    {title: 'Orders', path: '/orders'},
    {title: 'Analytics', path: '/analytics'},
    {title: 'Settings', path: '/settings'}
]

</script>

<template>
    <aside :class="['fixed left-0 top-16 z-40 h-screen w-64 bg-gray-200 text-black', 'transition-transform duration-300', sidebarStore.isOpen ? 'translate-x-0' : '-translate-x-full', 'md:static md:translate-x-0']">
        <div class="p-4">
            <h1 class="text-2xl font-bold">Workspace</h1>
        </div>

        <nav class="mt-4 text-lg">
            <ul>
                <li v-for="item in menuItems">
                    <NuxtLink @click="sidebarStore.close()" :to="item.path" class="transition block px-4 py-2 hover:bg-gray-300 hover:text-black" active-class="bg-gray-300 text-black">{{ item.title }}</NuxtLink>
                </li>
            </ul>
        </nav>
    </aside>
</template>