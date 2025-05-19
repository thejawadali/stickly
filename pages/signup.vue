<script setup lang="ts">
import { object, string } from 'yup'
import { authClient } from '~~/utils/auth-client'



const validationSchema = object({
  name: string().required('Name is required'),
  email: string().email('Invalid email').required('Email is required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Password is required')
})

const state = reactive({
  name: undefined,
  email: undefined,
  password: undefined
})

const errorMessage = ref('')

async function onSubmit(event: any) {
  const { name, email, password } = event.data
  const { data, error } = await authClient.signUp.email({
    email,
    password,
    name,
  })
  if (error) {
    if (error) {
    errorMessage.value = error?.message || 'Something went wrong'
  }
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
        <h2 class="mt-6 text-3xl font-extrabold text-white">
          Create your account
        </h2>
        <p class="text-sm text-gray-400">
          Create an account to get started.
        </p>
      </template>
      <UForm :schema="validationSchema" :state="state" class="space-y-4" @submit="onSubmit" @vue:updated="errorMessage = ''">
        <UFormGroup label="Name" name="name">
          <UInput v-model="state.name" placeholder="John Doe" />
        </UFormGroup>
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" placeholder="john.doe@example.com" />
        </UFormGroup>
        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" placeholder="Password" />
        </UFormGroup>
        <UButton type="submit" block>
          SignUp
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
              Already have an account?
              <UButton variant="link" to="/login">
                Sign in
              </UButton>
            </p>
          </div>
        </div>
      </template>
    </UCard>
  </UContainer>
</template>
