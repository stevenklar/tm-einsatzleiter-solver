// ==UserScript==
// @name         Einsatzleiter.net
// @namespace    http://kg52.de/
// @version      Beta
// @description  Automating the world rescue
// @author       maehtrix
// @match        http://www.einsatzleiter.net/
// @grant        none
// ==/UserScript==

(function() {
    //// @require      https://rawgit.com/notifyjs/notifyjs/master/dist/notify.js

    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.setAttribute("src", 'http://el/lib/require.min.js');
    script.setAttribute("data-main", 'http://el/app.js');
    head.appendChild(script);
})();
