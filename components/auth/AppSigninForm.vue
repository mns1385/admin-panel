<script setup lang="ts">
    
</script>

<template>
    <form>
        <div>
            <label for="email" class="mb-2 block text-xl font-medium text-white text-left">
                Email :
            </label>
            <input type="email" name="email" id="email" placeholder="Enter your email"
            class="block rounded-lg w-full text-xl px-4 py-1 ">
        </div>

        <div>
            <label for="username" class="mb-2 block text-xl font-medium text-white text-left">
                UserName :
            </label>
            <input type="text" name="username" id="username" placeholder="Enter your username"
            class="block rounded-lg w-full text-xl px-4 py-1 ">
        </div>

        <div>
            <label for="password" class="mb-2 block text-xl font-medium text-white text-left">
                Password :
            </label>
            <input type="password" name="password" id="password" placeholder="Enter your password"
            class="block rounded-lg w-full text-xl px-4 py-1 ">
        </div>

        <button type="submit" class="w-40 text-white text-xl bg-blue-500 rounded-full p-2 hover:bg-blue-600 active:bg-blue-700">
            Signin
        </button>
    </form>
</template>