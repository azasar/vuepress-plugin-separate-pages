"use strict";
const path = require('path');
module.exports = {
    name: 'separate-pages-plugin',
    enhanceAppFiles: path.resolve(__dirname, 'content-checker.js'),
}
