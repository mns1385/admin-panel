<script setup lang="ts">
import { UserPlus2, CheckCircle2, XCircle, Eye, EyeOff, Save, Loader2 } from 'lucide-vue-next'

const messageSuccess = ref('')
const messageError = ref('')

const errorClass = ref({
    email: false,
    name: false,
    password: false
})

const showPassword = ref(false)
const isLoader = ref(false)

const form = ref({
    email: '',
    name: '',
    password: ''
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
        password: false
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

    isLoader.value = true

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
        <form @submit.prevent="AddUser">
            <!--Email Input-->
            <div>
                <label for="email">
                    Email :
                </label>
                <input type="email" id="email" name="email" placeholder="Enter email" 
                v-model="form.email" :disabled="isLoader">
            </div>

            <!--Name Input-->
            <div>
                <label for="name">
                    Name :
                </label>
                <input type="text" id="name" name="name" placeholder="Enter name" 
                v-model="form.name" :disabled="isLoader">
            </div>

            <!--Password Input-->
            <div>
                <label for="password">
                    Password
                </label>
                <div>
                    <input :type="showPassword? 'text': 'password'" id="password" name="password" placeholder="Enter Password" 
                    v-model="form.password" :disabled="isLoader">
                    <button type="button" @click="showPassword = !showPassword">
                        <component :is="showPassword? Eye: EyeOff"/>
                    </button>
                </div>
            </div>

            <!--Buttons-->
            <div>
                <button type="submit">
                    <Save v-if="!isLoader"/>
                    <Loader2 v-else/>
                    <span>
                        {{ isLoader? 'Saving': 'Save' }}
                    </span>
                </button>

                <button @click="CancelForm">
                    Cancel
                </button>
            </div>
        </form>
    </div>
</template>