module.exports = {
  apps: [
    {
      name: 'hackathon-api',
      script: 'index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      log_date_format: "DD-MM-YYYY HH:mm:ss",
      env: {
        NODE_ENV: 'development',
        PORT: 3029,
        HOST: 'localhost',
      },
      env_staging: {
        NODE_ENV: 'staging',
        PORT: 3029,
        HOST: 'localhost'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3029,
        HOST: 'localhost',
      }
    }
  ]
}
