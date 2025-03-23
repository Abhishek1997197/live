document.addEventListener("DOMContentLoaded", function () {
    const toggleScript = document.getElementById("toggleScript");
    const statusText = document.getElementById("status");

    let scriptEnabled = false;

    toggleScript.addEventListener("change", function () {
        scriptEnabled = toggleScript.checked;
        statusText.textContent = scriptEnabled ? "Turn On" : "Turn Off";
        if (scriptEnabled) {
            enableBlocker();
        } else {
            disableBlocker();
        }
    });

    function enableBlocker() {
        document.body.addEventListener("click", preventNewTabOpen, true);
        document.body.addEventListener("touchstart", preventNewTabOpen, true);
        overrideWindowOpen();
    }

    function disableBlocker() {
        document.body.removeEventListener("click", preventNewTabOpen, true);
        document.body.removeEventListener("touchstart", preventNewTabOpen, true);
        restoreWindowOpen();
    }

    function preventNewTabOpen(event) {
        if (!scriptEnabled) return;
        event.preventDefault();
        event.stopPropagation();
        console.log("Blocked an unwanted tab from opening.");
    }

    let originalWindowOpen = window.open;

    function overrideWindowOpen() {
        window.open = function(url, name, specs) {
            console.log("Blocked attempt to open new tab:", url);
            return null;
        };
    }

    function restoreWindowOpen() {
        window.open = originalWindowOpen;
    }
});
