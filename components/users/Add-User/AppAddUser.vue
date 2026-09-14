<script setup lang="ts">
import { UserPlus2, CheckCircle2, XCircle, Eye, EyeOff, Save, Loader2 } from 'lucide-vue-next'
import { useApi } from '~/composables/useApi'

const data = useApi()

const messageSuccess = ref('')
const messageError = ref('')

const errorClass = ref({
    email: false,
    name: false,
    password: false,
    role: false
})

const showPassword = ref(false)
const isLoader = ref(false)

const form = ref({
    email: '',
    name: '',
    password: '',
    role: ''
})

const CancelForm = () => {
    
}

const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const AddUser = async () => {
    messageSuccess.value = ''
    messageError.value = ''

    errorClass.value = {
        email: false,
        name: false,
        password: false,
        role: false
    }

    if (!form.value.email) {
        messageError.value = 'Email is required!'
        errorClass.value.email = true
        return
    } else if (isValidEmail(form.value.email)) {
        messageError.value = 'Please enter valid email!'
        errorClass.value.email = true
        return
    }

    if (!form.value.name) {
        messageError.value = 'Name is required!'
        errorClass.value.name = true
        return
    }

    if (!form.value.password) {
        messageError.value = 'Password is required!'
        errorClass.value.password = true
        return
    } else if (form.value.password.length < 8) {
        messageError.value = 'Password must be at least 8 characters!'
        errorClass.value.password = true
        return
    }

    if (!form.value.role) {
        messageError.value = 'Please select role!'
        errorClass.value.role = true
        return
    }

    const dateCreate = new Date()
    const dateLogin = new Date()

    isLoader.value = true

    try {
        const users = await <any> data.getUsers()

        if (!users) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Users not found!'
            })
        }

        const existUser = users.find((u: any) => u.email === form.value.email)

        if (existUser) {
            throw createError ({
                statusCode: 409,
                statusMessage: 'This Email is already in use!'
            })
        }

        const newUser = {
            email: form.value.email,
            name: form.value.name,
            password: form.value.password,
            role: form.value.role,
            dateCreated: dateCreate,
            dateLogin: dateLogin
        }

        await data.createUser(newUser)

        messageSuccess.value = 'New User Added!'

        setTimeout(() => {

        }, 2000)
    } catch (error: any) {
        messageError.value = `${error.statusCode} : ${error.statusMessage}`
    }

    isLoader.value = false
}
</script>

<template>
    <div>
        <div>
            <UserPlus2/>
            <h1>Add New Users Form</h1>
        </div>

        <!--Message Success-->
        <div v-if="messageSuccess">
            <CheckCircle2/>
            <p>
                {{ messageSuccess }}
            </p>
        </div>

        <!--Message Error-->
        <div v-if="messageError">
            <XCircle/>
            <p>
                {{ messageError }}
            </p>
        </div>

        <!--Form Add New User-->
        <form>
            <!--Email Input-->
            <div>
                <label for="email">
                    Email :
                </label>
                <input type="email" id="email" name="email" placeholder="Enter email" v-model="form.email">
            </div>

            <!--Name Input-->
            <div>
                <label for="name">
                    Name :
                </label>
                <input type="text" id="name" name="name" placeholder="Enter name" v-model="form.name">
            </div>

            <!--Password Input-->
            <div>
                <label for="password">
                    Password
                </label>
                <div>
                    <input :type="showPassword? 'text': 'password'" id="password" name="password" placeholder="Enter Password" v-model="form.password">
                    <button type="button" @click="showPassword = !showPassword">
                        <component :is="showPassword? Eye: EyeOff"/>
                    </button>
                </div>
            </div>

            <!--Select Role-->
            <div>
                <label>
                    Select Role :
                </label>
                <form>
                    <div>
                        <label for="admin">
                            Admin
                        </label>
                        <input type="radio" id="admin" name="admin" v-model="form.role" value="admin">
                    </div>
                    <div>
                        <label for="user">
                            User
                        </label>
                        <input type="radio" id="user" name="user" v-model="form.role" value="user">
                    </div>
                </form>
            </div>

            <!--Buttons-->
            <div>
                <button>
                    <Save v-if="!isLoader"/>
                    <Loader2 v-else/>
                    <span>
                        {{ isLoader? 'Saving': 'Save' }}
                    </span>
                </button>

                <button>
                    Cancel
                </button>
            </div>
        </form>
    </div>
</template>