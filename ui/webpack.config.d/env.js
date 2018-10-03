const environmentConfig = {};

Object.keys(defined).forEach(key => {
    environmentConfig[key] = JSON.stringify(defined[key]);
});

config.plugins.push(new webpack.DefinePlugin({
    environmentConfig
}));
