module.exports = {
  apps: [{
    name: "node-app",
    script: './app.js',
    autorestart: true,
    watch: false,
    env: {
      // 개발 환경설정
      NODE_ENV: 'development',
    },
    env_production: {
      // 운영 환경설정 (--env production 옵션으로 지정할 수 있다.)
      NODE_ENV: 'production',
    }
  }]
};
