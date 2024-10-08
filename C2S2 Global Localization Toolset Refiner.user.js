// ==UserScript==
// @name         C2S2 Global Localization Toolset Refiner
// @namespace    https://w.amazon.com/bin/view/C2S2GlobalLocalization/Translation/
// @version      1.1
// @description  Script for C2S2 Global Localization and Translation. Adding quick response functionality.
// @author       abuffet@
// @match        https://issues.amazon.com/*
// @match        https://sim.amazon.com/*
// @icon         https://m.media-amazon.com/images/G/01/Anywhere/c2s2blurbs.PNG
// @updateURL    https://github.com/abuffet-amz/Script/raw/refs/heads/main/C2S2%20Global%20Localization%20Toolset%20Refiner.user.js
// @downloadURL  https://github.com/abuffet-amz/Script/raw/refs/heads/main/C2S2%20Global%20Localization%20Toolset%20Refiner.user.js

// @run-at       document-end

// ==/UserScript==

// Add a dropdown menu for quick response in Issues page
if (window.location.href.match('sim.amazon.com|issues.amazon.com')) {

    // Dropdown functionality for quick responses
    function addDropdown() {
        var textarea = document.getElementById("issue-conversation");
        if (!textarea) {
            console.error("Textarea not found. Exiting function.");
            return;
        }

        // Create a container div
        var container = document.createElement("div");
        container.style.display = "flex"; // Ensure elements are next to each other
        container.style.alignItems = "center"; // Align vertically in the center

        // Create an image element for the favicon
        var favicon = document.createElement("img");
        favicon.src = "https://m.media-amazon.com/images/G/01/Anywhere/c2s2blurbs.PNG"; // Direct link to the image
        favicon.alt = "C2S2 favicon";
        favicon.style.width = "32px"; // Initial size
        favicon.style.height = "auto"; // Maintain aspect ratio
        favicon.style.marginRight = "10px"; // Add spacing between the favicon and dropdown

        // Create the dropdown select element
        var select = document.createElement("select");
        var snippets = [
            { text: "Select...", value: "" },
            { text: "Receipt of Project — Outsourcing Confirmation", value: `Hi @ ,\n\nThank you for this request. Your project is outsourced for translation with an ETA of EOB {TIME ZONE} {DATE}.\n\n{Languages and Marketplace project 1}: ATMS #[2XXXX](https://)\n\nWe will update you once translation is complete. Please let us know if you have any questions.\n\nThanks,\n{Name}` },
            { text: "Receipt of Project — Files with status “Completed” (all segments at 101% matches)", value: `Hi @ ,\n\nThe files you provided have been translated before and we are getting all 101% in-context matches from the TM, therefore, there isn’t any new content for translation. In these cases we do not outsource the content as the vendors would only confirm the previously translated segments.\n\nI am attaching the completed files here, but please let me know if you have any questions.\n\nThanks,\n{Name}` },
            { text: "Delivery of Project — Final Delivery", value: `Hi @ ,\n\nPlease find your delivery attached. \nThis SIM will not be monitored after delivery. If you have additional files or requests, please file a new SIM.\n\nThanks,\n{Name}` },
            { text: "Delivery of Project — Partial Delivery", value: `Hi @ ,\n\nPlease find your delivery for the following languages attached:\n{Delivered Language 1}\n{Delivered Language 2}\n{Delivered Language 3}\n\nThe remaining deliveries are tracking for {DATE OR TIME}{TIME ZONE}.\n\nThanks,\n{Name}` },
            { text: "Linguistic Queries", value: `Hi @ ,\n\nWe have received a query from the linguist working on this project. This query applies to {languages}.\n\n{Query}\n\nKindly confirm your preference. In the meantime, we have asked the vendor to continue work using their best judgement to ensure on-time delivery.\n\nThanks,\n{Name}` },
            { text: "Extension Request", value: `Hi @ ,\n\nDue to {REASON}, the vendor has requested an extension which will move your delivery date to {TIME/DATE}{TIME ZONE}. Kindly confirm whether you have any concerns around this new timeline. \n\nThanks,\n{Name}` }
        ];

        snippets.forEach(function(snippet) {
            var option = document.createElement("option");
            option.text = snippet.text;
            option.value = snippet.value;
            select.appendChild(option);
        });

        // Event listener to update the textarea with the selected snippet
        select.addEventListener('change', function() {
            textarea.value = select.value;
        });

        // Add the favicon and the dropdown to the container
        container.appendChild(favicon);
        container.appendChild(select);

        // Insert the container before the textarea
        textarea.parentNode.insertBefore(container, textarea);

        // Automatically resize the favicon based on the dropdown size
        function resizeFavicon() {
            var selectHeight = select.offsetHeight; // Get the height of the dropdown
            favicon.style.width = selectHeight + "px"; // Set favicon width equal to the dropdown height
            favicon.style.height = "auto"; // Maintain aspect ratio
        }

        // Add event listener to resize favicon when the window is resized or content changes
        window.addEventListener('resize', resizeFavicon);
        select.addEventListener('change', resizeFavicon);

        // Initial favicon resize when the dropdown is first added to the DOM
        resizeFavicon();
    }

    // Detect mouseover event to insert dropdown
    var searchIssueBody = document.getElementById('issue-content');
    searchIssueBody.addEventListener('mouseover', addDropdown, { once: true });
}
