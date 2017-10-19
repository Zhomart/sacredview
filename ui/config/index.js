const configs = {
  development: {
    services: {
      baseURL: '/',
    },
    debug: true,
  },
  production: {
    services: {
      baseURL: '/',
    },
    debug: false,
  },
}

export default configs[process.env.NODE_ENV || 'development']
