// ==UserScript==
// @name         ATMS User List Phonetool Links
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds Phonetool links next to usernames in ATMS user list
// @author       abuffet@
// @match        https://atms.a2z.com/web/user/list*
// @match        https://web.atms.a2z.com/web/user/list*
// @grant        none
// @updateURL    https://github.com/abuffet-amz/Script/raw/refs/heads/main/ATMS%20User%20List%20Phonetool%20Links.js
// @downloadURL  https://github.com/abuffet-amz/Script/raw/refs/heads/main/ATMS%20User%20List%20Phonetool%20Links.js
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    function cleanUsername(username) {
        // Remove everything after hyphen or parenthesis and trim
        return username
            .split('-')[0]           // Take part before first hyphen
            .split('(')[0]           // Take part before first parenthesis
            .split(' ')[0]           // Take part before first space
            .trim();                 // Remove any remaining whitespace
    }

    function addPhoneToolLinks() {
        // Try to get the iframe content if we're on the main page
        let targetDocument = document;
        if (window.location.hostname === 'atms.a2z.com') {
            const iframe = document.querySelector('iframe');
            if (iframe && iframe.contentDocument) {
                targetDocument = iframe.contentDocument;
            }
        }

        // Find all cells with id="column-UserName"
        const usernameCells = targetDocument.querySelectorAll('td[id="column-UserName"]');
        
        usernameCells.forEach(cell => {
            // Skip if we already added a link
            if (cell.querySelector('.phonetool-link')) return;
            
            const fullUsername = cell.textContent.trim();
            const cleanedUsername = cleanUsername(fullUsername);
            
            if (cleanedUsername) {
                const link = document.createElement('a');
                link.href = `https://phonetool.amazon.com/users/${cleanedUsername}`;
                link.textContent = ' 📞';
                link.className = 'phonetool-link';
                link.target = '_blank';
                link.style.color = '#0066cc';
                link.style.marginLeft = '5px';
                link.title = `Open ${cleanedUsername} in Phonetool`; // Added tooltip
                cell.appendChild(link);
            }
        });
    }

    // Try multiple times to catch dynamic loading
    for (let i = 1; i <= 5; i++) {
        setTimeout(addPhoneToolLinks, i * 1000);
    }
})();