# VuePress Plugin Separate pages

> Separate pages plugin for [VuePress](https://vuepress.vuejs.org/) 1.x

## What

This is a VuePress plugin which shows content of current header by hashtag from location


## Rules
There is exactly one basic rule to follow:  
* Header tags like h1, h2, h3, h4 (#, ##, ###, ####) should not be inside html elements, for example `<div class="notranslate"><h2>Some header</h2></div>` will not work

## Install
```sh
$ npm install vuepress-plugin-separate-pages

# or

$ yarn add vuepress-plugin-separate-pages
```

## Usage
Add `separate-pages` in your site config file.

```js
// .vuepress/config.js

module.exports = {
  plugins: [
    [ 'separate-pages' ]
  ]
}
```

## Reference
- VuePress official [plugin docs](https://vuepress.vuejs.org/plugin/)

## License
MIT ©