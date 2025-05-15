<script setup lang="ts">
import { authClient } from "~~/utils/auth-client"
const session = authClient.useSession()
console.log(session)
</script>

<template>
  <div>
    <template v-if="!session?.data">
      <button @click="() => authClient.signIn.social({
        provider: 'github'
      })">
        Continue with GitHub
      </button>
      <br>
      <br>
      <button @click="() => authClient.signIn.social({
        provider: 'google'
      })">
        Continue with Google
      </button>
    </template>
    <div>
      <pre>{{ session.data }}</pre>
      <button v-if="session.data" @click="authClient.signOut()">
        Sign out
      </button>
    </div>
  </div>
</template>