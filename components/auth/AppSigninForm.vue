<script setup lang="ts">
    
</script>

<template>
    <form>
        <div>
            <label for="email">
                Email :
            </label>
            <input type="email" name="email" id="email">
        </div>

        <div>
            <label for="username">
                UserName :
            </label>
            <input type="text" name="username" id="username">
        </div>

        <div>
            <label for="password">
                Password :
            </label>
            <input type="password" name="password" id="password">
        </div>

        <button type="submit">
            Signin
        </button>
    </form>
</template>