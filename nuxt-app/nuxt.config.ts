import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    typescript: {
        shim: false
      },
    css: ['@/assets/styles/main.scss'],
    modules: ['@nuxtjs/supabase'],
    supabase: {
      url: process.env.SUPABASE_URL,
      key: process.env.SUPABASE_KEY
    }
})
