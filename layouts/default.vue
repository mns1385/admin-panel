<template>
    <div>
        <AppHeader/>

        <div class="flex">
            <AppSidebar/>

            <main class="flex-1">
                <slot/>
            </main>
        </div>
    </div>
</template>
