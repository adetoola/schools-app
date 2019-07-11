module.exports = {
    apps: [
        {
            name: 'school-app',
            script: './server.js',
            watch: true,
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};
