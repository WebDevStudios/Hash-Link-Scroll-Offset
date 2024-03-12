const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
    ...defaultConfig,
    entry: './src/hash-link-scroll-offset.js',
    output: {
        ...defaultConfig.output,
        path: path.resolve(__dirname, 'assets/js'),
        filename: 'hash-link-scroll-offset.min.js',
    },
    plugins: [
        ...defaultConfig.plugins,
        new CopyPlugin({
            patterns: [
                { 
                    from: 'src/hash-link-scroll-offset.js', 
                    to: 'hash-link-scroll-offset.js',
                    info: { minimized: true }
                },
            ],
        }),
    ]
};
