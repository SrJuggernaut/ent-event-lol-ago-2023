module.exports = {
  apps : [{
    name: process.env.APP_NAME || 'ent-event-lol-ago-2023',
    script: 'yarn',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: process.env.PORT || 3702,
      NEXT_PUBLIC_APPWRITE_PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID|| '',
      NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '',
      APPWRITE_API_KEY: process.env.APPWRITE_API_KEY || '',
      NEXT_PUBLIC_RECAPTCHA_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_KEY || '',
      RECAPTCHA_SECRET: process.env.RECAPTCHA_SECRET || '',
    }
  }],
  deploy : {
    preview : {
      user: process.env.DEPLOY_USER || '',
      host: process.env.DEPLOY_HOST || '',
      ref: 'origin/preview',
      repo: 'https://github.com/SrJuggernaut/ent-event-lol-ago-2023.git',
      path: process.env.DEPLOY_PATH || '', 
      'pre-deploy': 'yarn install',
      'post-deploy': 'pm2 startOrRestart ecosystem.config.js',
      env: {
        PORT: process.env.PORT || 3700,
        NEXT_PUBLIC_APPWRITE_PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
        NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
        APPWRITE_API_KEY: process.env.APPWRITE_API_KEY,
        NEXT_PUBLIC_RECAPTCHA_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_KEY,
        RECAPTCHA_SECRET: process.env.RECAPTCHA_SECRET
      }
    },
    production : {
      user: process.env.DEPLOY_USER || '',
      host: process.env.DEPLOY_HOST || '',
      ref: 'origin/production',
      repo: 'https://github.com/SrJuggernaut/ent-event-lol-ago-2023.git',
      path: process.env.DEPLOY_PATH || '',
      'pre-deploy': 'yarn install && yarn run build',
      'post-deploy': 'pm2 startOrRestart ecosystem.config.js',
      env: {
        PORT: process.env.PORT || 3701,
        NEXT_PUBLIC_APPWRITE_PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
        NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
        APPWRITE_API_KEY: process.env.APPWRITE_API_KEY,
        NEXT_PUBLIC_RECAPTCHA_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_KEY,
        RECAPTCHA_SECRET: process.env.RECAPTCHA_SECRET
      }
    }
  },
}
