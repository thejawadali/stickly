<script setup lang="ts">
import { object, string } from 'yup'
import { authClient } from '~~/utils/auth-client'

const validationSchema = object({
  email: string().email('Invalid email').required('Email is required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Password is required'),
})

const errorMessage = ref('')
const isLoading = ref(false)

const state = reactive({
  email: 'john@doe.com',
  password: '12345678',
})

async function onSubmit(event: any) {
  isLoading.value = true
  const { email, password } = event.data
  const { data, error } = await authClient.signIn.email({
    email,
    password,
  })
  if (error) {
    errorMessage.value = error?.message || 'Something went wrong'
  }
  if (data) {
    navigateTo('/')
  }
  isLoading.value = false
}
</script>

<template>
  <UContainer class="grid h-screen place-content-center">
    <UCard class="w-[450px]">
      <template #header>
        <h2 class="mt-6 text-3xl text-black font-extrabold dark:text-white">
          Login to your account
        </h2>
        <p class="text-sm text-gray-400">
          Welcome back! Please enter your details to login.
        </p>
      </template>
      <UForm :schema="validationSchema" :state="state" class="space-y-4" @submit="onSubmit" @vue:updated="errorMessage = ''">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" placeholder="john.doe@example.com" :error="errorMessage" />
        </UFormGroup>
        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" placeholder="Password" :error="errorMessage" />
        </UFormGroup>
        <UButton type="submit" block color="primary" variant="solid" :loading="isLoading">
          Login
        </UButton>
      </UForm>
      <p v-if="errorMessage" class="mt-2 text-xs text-red-600 capitalize">
        {{ errorMessage }}
      </p>
      <template #footer>
        <div class="grid grid-cols-2 gap-3">
          <!-- github -->
          <UButton block color="gray" :loading="isLoading" @click="authClient.signIn.social({ provider: 'github' })">
            <template #leading>
              <Icon name="carbon:logo-github" class="h-5 w-5" />
            </template>
            GitHub
          </UButton>

          <!-- google -->
          <UButton block color="gray" :loading="isLoading" @click="authClient.signIn.social({ provider: 'google' })">
            <template #leading>
              <Icon name="carbon:logo-google" class="h-5 w-5" />
            </template>
            Google
          </UButton>

          <div class="col-span-2 text-center">
            <p class="mt-2 text-sm text-gray-400">
              Don't have an account?
              <UButton variant="link" to="/signup">
                Sign up
              </UButton>
            </p>
          </div>
        </div>
      </template>
    </UCard>
  </UContainer>
</template>
