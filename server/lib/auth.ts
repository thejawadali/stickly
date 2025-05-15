import { betterAuth } from "better-auth"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { MongoClient } from "mongodb"

const config = useRuntimeConfig();
const client = new MongoClient(config.mongoUri)
const db = client.db()
export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    github: {
      clientId: config.githubId,
      clientSecret: config.githubSecret,
    },
    google: { 
      clientId: config.googleId, 
      clientSecret: config.googleSecret,
    },
  },
})