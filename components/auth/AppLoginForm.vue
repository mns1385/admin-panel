<template>
    <form class="space-y-5">
        <div>
            <label for="email" class="mb-2 block text-xl font-medium text-white text-left">
                Email :
            </label>

            <input id="email" name="email" type="email" placeholder="Enter your email"
            class="block rounded-lg w-full text-xl px-4 py-1 ">
        </div>

        <div>
            <label for="password" class="mb-2 block text-xl font-medium text-white text-left">
                Password :
            </label>

            <input type="password" name="password" id="passwprd" placeholder="Enter your password"
            class="block rounded-lg w-full text-xl px-4 py-1 ">
        </div>

        <button type="submit" class="w-40 text-white text-xl bg-blue-500 rounded-lg p-2 hover:bg-blue-600 active:bg-blue-700">
            Login
        </button>
    </form>
</template>