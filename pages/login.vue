<script setup lang="ts">
import { object, string } from 'yup'
import { authClient } from '~~/utils/auth-client'



const validationSchema = object({
  email: string().email('Invalid email').required('Email is required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Password is required')
})

const state = reactive({
  email: undefined,
  password: undefined
})


async function onSubmit(event: any) {
  const { email, password } = event.data
  const { data, error } = await authClient.signIn.email({
    email,
    password,
  })
  if (data) {
    navigateTo('/')
  }
}

const toast = useToast()
function showToast() {
  console.log('showToast');
  
  toast.add({
    title: 'Success',
    description: 'Your action was completed successfully.',
    color: 'green'
  })
}
</script>

<template>
  <UContainer class="grid place-content-center h-screen">
    <UCard class="w-[450px]">
      <template #header>
        <h2 @click="showToast" class="mt-6 text-3xl font-extrabold dark:text-white text-black">
          Login to your account
        </h2>
      </template>
      <UForm :schema="validationSchema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" placeholder="john.doe@example.com" />
        </UFormGroup>
        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" placeholder="Password" />
        </UFormGroup>
        <UButton type="submit" block color="primary" variant="solid">
          Login
        </UButton>
      </UForm>
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