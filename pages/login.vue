<script setup lang="ts">
import { authClient } from "~~/utils/auth-client"
import { object, string, type InferType } from 'yup'

const session = authClient.useSession()
const loading = ref(false)

const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string().required('Required')
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined
})

const onSubmit = async (event: { data: Schema }) => {
  loading.value = true
  try {
    await authClient.signIn.email({
      email: event.data.email,
      password: event.data.password,
    })
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const handleSocialSignIn = async (provider: 'github' | 'google') => {
  try {
    await authClient.signIn.social({ provider })
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 p-4">
    <UCard
      class="w-full max-w-md backdrop-blur-xl bg-gray-800/50 border border-gray-700/50"
      :ui="{
        base: 'relative',
        header: {
          base: 'border-b border-gray-700/50',
          padding: 'p-6'
        },
        body: {
          base: '',
          padding: 'p-6'
        },
        footer: {
          base: 'border-t border-gray-700/50',
          padding: 'p-6'
        }
      }"
    >
      <template #header>
        <div class="text-center">
          <h2 class="text-2xl font-bold text-white">
            Sign in to your account
          </h2>
          <p class="mt-2 text-sm text-gray-400">
            Don't have an account?
            <UButton
              variant="link"
              to="/signup"
            >
              Sign up
            </UButton>
          </p>
        </div>
      </template>

      <UForm
        :schema="schema"
        :state="state"
        class="space-y-6"
        @submit="onSubmit"
      >
        <UFormField label="Email" name="email" class="text-white">
          <UInput
            v-model="state.email"
            type="email"
            placeholder="you@example.com"
          />
        </UFormField>

        <UFormField label="Password" name="password" class="text-white">
          <UInput
            v-model="state.password"
            type="password"
            placeholder="••••••••"
          />
        </UFormField>

        <UButton
          type="submit"
          block
          variant="solid"
          color="cyan"
          :loading="loading"
          :disabled="loading"
        >
          Sign in
        </UButton>
      </UForm>

      <template #footer>
        <div class="space-y-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-700/50" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-gray-800/50 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <UButton
              block
              color="gray"
              variant="soft"
              @click="handleSocialSignIn('github')"
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
              @click="handleSocialSignIn('google')"
            >
              <template #leading>
                <Icon name="carbon:logo-google" class="w-5 h-5" />
              </template>
              Google
            </UButton>
          </div>
        </div>
      </template>
    </UCard>
  </div>
</template>