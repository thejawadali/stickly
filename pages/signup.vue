<script setup lang="ts">
import { authClient } from "~~/utils/auth-client"
import { object, string } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'

const session = authClient.useSession()
const loading = ref(false)
const showErrors = ref(false)

const { handleSubmit, values, errors } = useForm({
  validationSchema: toTypedSchema(
    object({
      name: string().required('Name is required'),
      email: string().required('Enter valid email').email(),
      password: string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
    }),
  ),
})

const onSubmit = handleSubmit(async (values) => {
  showErrors.value = true
  loading.value = true
  try {
    await authClient.signUp.email({
      email: values.email,
      password: values.password,
      name: values.name,
    })
    // Redirect to login page after successful signup
    navigateTo('/login')
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-white">
          Create your account
        </h2>
        <p class="mt-2 text-sm text-gray-400">
          Already have an account?
          <UButton
            variant="link"
            to="/login"
          >
            Sign in
          </UButton>
        </p>
      </div>

      <div class="mt-8 space-y-6">
        <form class="space-y-6" @submit="onSubmit">
          <UFormGroup label="Name" :error="showErrors ? errors.name : undefined" class="text-white">
            <UInput
              v-model="values.name"
              placeholder="John Doe"
              required
            />
          </UFormGroup>

          <UFormGroup label="Email" :error="showErrors ? errors.email : undefined" class="text-white">
            <UInput
              v-model="values.email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </UFormGroup>

          <UFormGroup label="Password" :error="showErrors ? errors.password : undefined" class="text-white">
            <UInput
              v-model="values.password"
              type="password"
              placeholder="••••••••"
              required
            />
          </UFormGroup>

          <UButton
            type="submit"
            block
            variant="solid"
            color="cyan"
            :loading="loading"
            :disabled="loading"
          >
            Sign up
          </UButton>
        </form>

        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-700" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-gray-900 text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <UButton
            block
            color="gray"
            variant="soft"
            @click="authClient.signIn.social({ provider: 'github' })"
          >
            <template #leading>
              <Icon name="carbon:logo-github" class="w-5 h-5" />
            </template>
            GitHub
          </UButton>

          <UButton
            block
            color="gray"
            variant="soft"
            @click="authClient.signIn.social({ provider: 'google' })"
          >
            <template #leading>
              <Icon name="carbon:logo-google" class="w-5 h-5" />
            </template>
            Google
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template> 