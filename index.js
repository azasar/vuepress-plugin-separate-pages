"use strict";
const path = require('path');
module.exports = {
    name: 'separate-pages',
    enhanceAppFiles: path.resolve(__dirname, 'content-checker.js'),
}
