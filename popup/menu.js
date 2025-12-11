document.addEventListener("DOMContentLoaded", () => {
    const checkbox = document.getElementById("check");

    browser.storage.local.get("myCheckStatus").then(result => {
        checkbox.checked = result.myCheckStatus ?? true;
    });

    checkbox.addEventListener("change", () => {
        browser.storage.local.set({
            myCheckStatus: checkbox.checked
        });
    });
});