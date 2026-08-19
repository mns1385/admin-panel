<script setup lang="ts">
import AppLoginForm from '~/components/auth/AppLoginForm.vue';

definePageMeta({
    layout: 'auth'
})
</script>

<template>
    <div class="mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-white/10 p-8 shadow-2xl">
        <div class="mb-8 text-center">
            <h1 class="text-3xl font-bold text-white">
                Welcome Back
            </h1>

            <p class="mt-2 text-sm text-gray-400">
                Sign in to your account
            </p>

            <AppLoginForm/>
        </div>
    </div>
</template>