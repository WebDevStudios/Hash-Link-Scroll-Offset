window.Hash_Link_Scroll_Offset = window.Hash_Link_Scroll_Offset || {};

(function(window, document, app) {
    "use strict";
    app.scrollTo = 0;
    app.initialScroll = false;
    app.isScrolling = false;
    app.hash = null;
    if (window.location.hash) {
        app.initialScroll = true;
    }
    app.init = function() {
        app.offset = app.getOffset();
        app.htmlAndBody = document.querySelectorAll("html, body");
        const checkScroll = document.querySelectorAll("a:not(.no-scroll)");
        checkScroll.forEach(function(a) {
            a.addEventListener("click", function(evt) {
                app.hash = this.hash;
                if (!app.hash) {
                    return;
                }
                app.scrollToHash(app.hash, evt);
            });
        });
        if (app.initialScroll) {
            app.hash = window.location.hash;
            const elementToScrollTo = app.getHashElement(app.hash);
            if (!elementToScrollTo) {
                return;
            }
            setTimeout(function() {
                app.isScrolling = true;
                window.scrollTo(0, 0);
                app.scrollToHash(elementToScrollTo);
            }, 10);
        }
    };
    app.getOffset = function() {
        let offset = typeof hlsOffset !== "undefined" ? hlsOffset.offset : 0;
        if (document.getElementById("wpadminbar")) {
            offset = (parseInt(offset, 10) + 32).toString();
        }
        return offset;
    };
    app.getHashElement = function(hash) {
        const isEl = typeof hash === "object";
        let elementToScrollTo = isEl ? hash : document.getElementById(hash.substr(1));
        if (!elementToScrollTo && !isEl) {
            elementToScrollTo = document.querySelector('[name="' + hash.substr(1) + '"]');
        }
        if (!elementToScrollTo) {
            return false;
        }
        if (elementToScrollTo.classList.contains("no-scroll") || elementToScrollTo.closest(".no-scroll-wrap")) {
            return false;
        }
        return elementToScrollTo;
    };
    app.scrollToHash = function(hash, evt) {
        const elementToScrollTo = typeof hash === "object" ? hash : app.getHashElement(hash);
        if (!elementToScrollTo) {
            return;
        }
        app.isScrolling = true;
        app.scrollTo = elementToScrollTo.getBoundingClientRect().top + window.scrollY - app.offset;
        const event = new Event("hash_link_scroll_offset.scroll_to");
        app.htmlAndBody.forEach(function(el) {
            el.dispatchEvent(event);
        });
        app.scroll(app.scrollTo);
        if (evt && evt.preventDefault) {
            evt.preventDefault();
        }
    };
    app.scroll = function(scrollTo) {
        window.scrollTo({
            top: scrollTo,
            behavior: "smooth"
        });
        app.initialScroll = app.isScrolling = false;
        const event = new Event("hash_link_scroll_offset.complete");
        app.htmlAndBody.forEach(function(el) {
            el.dispatchEvent(event);
        });
    };
    app.init();
    return app;
})(window, document, window.Hash_Link_Scroll_Offset);