<template>
    <aside class="h-screen w-64 bg-gray-900 text-white">
        <div class="p-4">
            <h2 class="text-xl font-bold">Admin Panel</h2>
        </div>

        <nav class="mt-4">
            <ul>
                <li>
                    <NuxtLink to="/">
                        Dashboard
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/profile">
                        Profile
                    </NuxtLink>
                </li>
            </ul>
        </nav>
    </aside>
</template>