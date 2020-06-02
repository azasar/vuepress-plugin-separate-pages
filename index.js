"use strict";
const path = require('path');
module.exports = (options) => ({
    name: 'separate-pages',
    enhanceAppFiles: path.resolve(__dirname, 'content-checker.js'),
    define: {
        SEPARATE_PAGES_OPTIONS: JSON.stringify(options)
    }
})
