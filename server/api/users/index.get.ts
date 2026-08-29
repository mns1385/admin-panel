export default defineEventHandler(async () => {
    return await $fetch('http://localhost:3001/users')
})