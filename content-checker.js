window.$ = window.jQuery = require('jquery');

$(document).ready(() => {
    setInitialCheck();

    addStyles();

    hideContent();
});

$('html').on('click', 'a', function() {
    hideContent();
    setTimeout(() => {
        checkContent();
    }, 100);
});

/**
 * Check every 100 milliseconds, until content is rendered or 50 checks were applied
 */
function setInitialCheck() {
    let counter = 0;
    const interval = setInterval(() => {
        if ($('.content').contents().length || counter === 50) {
            checkContent();
            clearInterval(interval);
        }

        counter++;
    }, 100);
}

function checkContent() {
    if (!isTranslation()) {
        if (location.hash) {
            showOnlyCurrentHeaderContent();
        } else {
            showOnlyLevelOneContent();
        }
    }

    showContent();
}

/**
 * Finds block by # from location, shows it, and hides other blocks
 */
function showOnlyCurrentHeaderContent() {
    let header = $(`${location.hash}`);
    const levelTwoHeader = getLevelTwoHeader(header);

    if (levelTwoHeader) {
        wrapTextNodes($('.content'));
        // unwrapNoTranslateBlocks();

        const levelOneHeader = getLevelOneHeader();

        // hide all content till current header (except h1)
        if (levelOneHeader) {
            levelOneHeader.nextUntil(levelTwoHeader).hide();
        }

        // hide all content after next header
        const nextHeader = levelTwoHeader.next();
        if (nextHeader) {
            nextHeader.nextAll().hide();
        }

        // show header if it was hidden before
        levelTwoHeader.show();
        // show header's content if it was hidden before
        levelTwoHeader.nextUntil('h2').show();

        // make sure that it scrolls to target header (even if it is not level 2)
        if (header) {
            header.get(0).scrollIntoView();
        }
    }
}

/**
 * Shows content between h1 and first h2
 */
function showOnlyLevelOneContent() {
    const levelOneHeader = getLevelOneHeader();

    wrapTextNodes($('.content'));
    // unwrapNoTranslateBlocks();

    if (levelOneHeader) {
        levelOneHeader.nextAll().hide();
        levelOneHeader.nextUntil('h2').show();
    }
}

function showContent() {
    $('body').removeClass('shy');
}

function hideContent() {
    $('body').addClass('shy');
}

function getLevelOneHeader() {
    return $('.content').find('h1:first')
}

function getLevelTwoHeader(header) {
    // set header to level 2 if current header is level 3 or level 4
    if (header.prop('tagName') === 'H3' || header.prop('tagName') === 'H4') {
        return header.prevAll('h2').first();
    }

    return header;
}

function isTranslation() {
    const firstUrlPart = location.pathname.split('/')[1];
    return firstUrlPart === 'ru';
}

/**
 * Some elements are just text nodes, by wrapping into <p></p> it is possible to show/hide them like other nodes
 * @param element
 */
function wrapTextNodes(element) {
    element.contents()
        .filter(function() {
            // get only non empty text nodes
            return this.nodeType === 3 && this.nodeValue !== ' ';
        })
        .wrap("<p></p>");
}

/**
 * This global style is needed to show/hide page content (this element is updated by Vuepress)
 */
function addStyles() {
    const styleTag = $('<style>.shy .page { visibility: hidden; }</style>')
    $('html > head').append(styleTag);
}