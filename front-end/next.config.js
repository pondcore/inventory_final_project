const nextTranslate = require('next-translate');

module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    backendUrl: process.env.API_URL,
  },
  images: {
    domains: ['picsum.photos'],
  },
  ...nextTranslate(),
}
