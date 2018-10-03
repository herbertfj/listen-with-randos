config.devServer = {
    historyApiFallback: true,
    proxy: {
        '/api': 'http://localhost:8080',
    }
};
