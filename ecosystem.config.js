module.exports = {
  apps: [
    {
      name: 'DruzbaBackend',
      port: '3001',
      exec_mode: 'cluster',
      instances: 'max',
      script: './dist/main.js',
    },
  ],
};
