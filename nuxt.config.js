module.exports = {
  dev: (process.env.NODE_ENV !== 'production'),
  /*
  ** Headers of the page
  */
  head: {
    title: 'Babyfoo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Babyfoo project' },
    ],
  },
  /*
  ** Global CSS
  */
  css: [
      { src: '~/assets/scss/main.scss', lang: 'scss' },
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  plugins: [
    { src: '~/plugins/toast', ssr: false },
  ],
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  },
};
