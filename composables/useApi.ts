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

    const createUser = async (user: {email: string, name: string, password: string, role: string, dateCreated: Date, dateLogin: Date}) => {

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

    const updateUser = async (id: string, user: {email: string, name: string, password: string, role: string, dateCreated: Date, dateLogin: Date}) => {
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
            await $fetch(`${baseUrl}/users/${id}`, {
                method: 'PUT',
                body: user
            })

        } catch (error) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Error in update user server!'
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


    const getOrders = async () => {
        try {
            const data = await $fetch(`${baseUrl}/orders`)

            return data
        } catch (error) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Error in get orders!'
            })
        }
    }

    const getOrder = async (id: string) => {

        if (!id) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Id for order is required!'
            })
        }

        try {
            const data = await $fetch(`${baseUrl}/orders/${id}`)

            return data
        } catch (error) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Error in get orders!'
            })
        }
    }

    const createOrder = async (order: {userId: string, name: string, status: string, amount: number, date: string, number: number}) => {

        if (!order) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Order is required'
            })
        }

        try {
            const data = await $fetch(`${baseUrl}/orders`, {
                method: 'POST',
                body: order
            })

            return data
        } catch (error) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Error in create order!'
            })
        }
    }

    const updateOrder = async (id: string, order: {userId: string, name: string, status: string, amount: number, date: string, number: number}) => {
        if (!id) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Id for user is required!'
            })
        }

        if (!order) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Order is required'
            })
        }

        try {
            await $fetch(`${baseUrl}/orders/${id}`, {
                method: 'PUT',
                body: order
            })

        } catch (error) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Error in update order server!'
            })
        }
    }

    const deleteOrder = async (id: string) => {
        if (!id) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Id for order is required!'
            })
        }

        try {
            const data = await $fetch(`${baseUrl}/orders/${id}`, {
                method: 'DELETE'
            })

            return data
        } catch (error) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Error in delete order!'
            })
        }
    }

    return {
        getUsers,
        getUser,
        createUser,
        updateUser,
        deleteUser,
        
        getOrders,
        getOrder,
        createOrder,
        updateOrder,
        deleteOrder
    }
}