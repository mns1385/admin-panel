export const useApi = () => {
    const baseUrl = 'http://localhost:3001'

    const getUsers = async () => {
        try {
            const data = await $fetch(`${baseUrl}/users`)

            return data
        } catch (error) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Error in get users!'
            })
        }
    }

    const getUser = async (id: string) => {

        if (!id) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Id for user is required!'
            })
        }

        try {
            const data = await $fetch(`${baseUrl}/users/${id}`)

            return data
        } catch (error) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Error in get user!'
            })
        }
    }

    const createUser = async (user: {email: string, name: string, password: string, role: string}) => {

        if (!user) {
            throw createError({
                statusCode: 400,
                statusMessage: 'User is required'
            })
        }

        try {
            const data = await $fetch(`${baseUrl}/users`, {
                method: 'POST',
                body: user
            })

            return data
        } catch (error) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Error in create user!'
            })
        }
    }

    const updateUser = async (id: string, user: {email: string, name: string, password: string, role: string}) => {
        if (!id) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Id for user is required!'
            })
        }

        if (!user) {
            throw createError({
                statusCode: 400,
                statusMessage: 'User is required'
            })
        }

        try {
            const data = await $fetch(`${baseUrl}/users/${id}`, {
                method: 'PUT',
                body: user
            })

            return data
        } catch (error) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Error in update user!'
            })
        }
    }

    const deleteUser = async (id: string) => {
        if (!id) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Id for user is required!'
            })
        }

        try {
            const data = await $fetch(`${baseUrl}/users/${id}`, {
                method: 'DELETE'
            })

            return data
        } catch (error) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Error in delete user!'
            })
        }
    }

    return {
        getUsers,
        getUser,
        createUser,
        updateUser,
        deleteUser
    }
}