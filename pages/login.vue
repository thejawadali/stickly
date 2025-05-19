<script setup lang="ts">
import { object, string } from 'yup'
import { authClient } from '~~/utils/auth-client'



const validationSchema = object({
  email: string().email('Invalid email').required('Email is required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Password is required')
})

const errorMessage = ref('')

const state = reactive({
  email: 'john@doe.com',
  password: '12345678'
})


async function onSubmit(event: any) {
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
}
</script>

<template>
  <UContainer class="grid place-content-center h-screen">
    <UCard class="w-[450px]">
      <template #header>
        <h2 class="mt-6 text-3xl font-extrabold dark:text-white text-black">
          Login to your account
        </h2>
        <p class="text-sm text-gray-400">
          Welcome back! Please enter your details to login.
        </p>
      </template>
      <UForm :schema="validationSchema" :state="state" class="space-y-4" @submit="onSubmit" @vue:updated="errorMessage = ''">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" placeholder="john.doe@example.com" :error="errorMessage"/>
        </UFormGroup>
        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" placeholder="Password" :error="errorMessage"/>
        </UFormGroup>
        <UButton type="submit" block color="primary" variant="solid">
          Login
        </UButton>
      </UForm>
      <p v-if="errorMessage" class="text-xs text-red-600 mt-2 capitalize">{{ errorMessage }}</p>
      <template #footer>
        <div class="grid grid-cols-2 gap-3">
          <!-- github -->
          <UButton block color="gray" @click="authClient.signIn.social({ provider: 'github' })">
            <template #leading>
              <Icon name="carbon:logo-github" class="w-5 h-5" />
            </template>
            GitHub
          </UButton>

          <!-- google -->
          <UButton block color="gray" @click="authClient.signIn.social({ provider: 'google' })">
            <template #leading>
              <Icon name="carbon:logo-google" class="w-5 h-5" />
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