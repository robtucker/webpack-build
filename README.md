# webpack-build

Personal webpack build.

```
npm install -D @robtucker/webpack-build
```

Includes the following environments:

1. dev
- ts-loader
- source-map-loader
- css modules
- image-webpack-loader
- wepack-dev-server
- hot module replacement

2. prod
- concatenate js modules
- split vendor js in commons chunk
- minify js
- extracts and minify styles


# Usage
### Create webpack config file

Create a webpack config file, `webpack.config.js`, in your project root and add the following:

```javascript
const build = require('@robtucker/webpack-build');
const webpackMerge = require('webpack-merge');

const custom = {
    // your custom options go here
    entry: "./src/app.tsx",
}

module.exports = webpackMerge(build.getConfig(), custom)

```

### Create a .env file

You are expected to provide a `.env` file which will be used at compile time to configure your app. A `.env.example` file has been provided to demonstrate the format.

At the very beginning of the build process your .env file is loaded and parsed into json by the [dotenv](https://github.com/motdotla/dotenv) package. Webpack then uses the [Define Plugin](https://webpack.js.org/plugins/define-plugin) to make this object available inside your project as `process.env.CONFIG`.

If you are using typescript I highly recommend that you re-export this as a typed object:

```typescript
export interface ConfigModel {
    API_HOST: string
    APP_VERSION: string
    ENV: string
    GOOGLE_API_KEY: string
    SERVICE: string
    SUPPORT_EMAIL: string
}

export const config: ConfigModel = process.env.CONFIG
```

### Create a Handlebars template

If you are building for web, you must create an html file which represents the entry point of your app.

Webpack uses the [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) which expects to find a [handlebars](http://handlebarsjs.com/) template file, located at `src/index.hbs`.

The `HtmlWebpackPlugin` will add a bunch of stuff into your template, such as scripts, stylesheets, favicon, title etc... and then output your file as index.html.

Feel free to copy the demo provided in this repo.
