export default defineEventHandler(async () => {
    return await $fetch('/localhost:3001/users')
})