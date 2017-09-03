var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },
    resolve: {
    extensions: ['.ts', '.js', '.css', '.scss']
    },
    devServer: {
        contentBase: helpers.root('dist'),
        compress: true,
        port: 8080,
        inline: true,
        open: true
    },
    module: {
    rules: [
        {
        test: /\.ts$/,
        exclude: [/\.(spec|e2e)\.ts$/],
        use:[{
                loader: 'awesome-typescript-loader',
                options: { configFileName: helpers.root('tsconfig.json') }
            },
            "angular2-template-loader"
        ]
    },
    {
      test: /\.html$/,
      use: 'html-loader'
    },
    {
    test: /\.(png|jpe?g|gif|svg)$/,
    include: helpers.root('assets'),
    use: [
        {
            loader: 'file-loader',
            options: {
                name: 'assets/images/[name]-[sha512:hash:base64:7].[ext]'
            }
        }
    ]
    },
        {
            test: /\.css$/,
            include: helpers.root('src', 'app'),
            use: 'raw-loader'
        },
        {
            test: /(\.css|.scss)$/,
            include: helpers.root('src'),
            exclude: helpers.root('src', 'app'),
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        }
    ]
    },
    
    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('./src'), // location of your src
            {} // a map of your routes
        ),
        
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};

