<script setup lang="ts">
import { Component } from 'lucide-vue-next';
import { ref } from 'vue'

import Login from '~/components/auth/AppLoginForm.vue'
import Signin from '~/components/auth/AppSigninForm.vue'

definePageMeta({
    layout: 'auth',
    middleware: 'guest'
})

let forms = ref(true)
</script>

<template>
    <div class="mx-auto w-full max-w-sm rounded-3xl border border-white/10 bg-white/30 p-8 shadow-2xl">
        <div class="mb-8 text-center">
            <h1 class="text-3xl font-bold text-white">
                Welcome Back
            </h1>

            <p class="mt-2 text-sm text-gray-400 mb-5">
                Sign in to your account
            </p>

            <component :is="forms? Login: Signin"/>
        </div>

        <button type="button" @click="forms = !forms"
        class="text-lg text-blue-500">
            {{ forms? 'Signin to accont': 'Login to accont' }}
        </button>
    </div>
</template>