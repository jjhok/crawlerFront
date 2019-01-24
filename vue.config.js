module.exports = {
    devServer: {
        watchOptions: {
            poll: true
        },
        proxy: {
            '^/api': {
                target: 'http://localhost:8001/',
                ws: true,
                changeOrigin: true,
            }
        }
    }
}