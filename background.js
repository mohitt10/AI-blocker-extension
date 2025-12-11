const codingSites = [
    "leetcode.com",
    "codeforces.com",
    "codechef.com"
];

const aiSites = [
    "chatgpt.com",
    "claude.ai",
    "bard.google.com",
    "gemini.google.com",
    "perplexity.ai"
];

// function to check whether the toggle is open
async function isEnabled() {
    let result = await browser.storage.local.get("myCheckStatus");
    return result.myCheckStatus === true;
}

// function to check if the tab address matches with any address in the list
async function anyTabMatches(siteList) {
    const tabs = await browser.tabs.query({});
    return tabs.some(tab => {
        if (!tab.url) return false;
        return siteList.some(site => tab.url.includes(site));
    });
}


// Main handler for TAB
browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    // Only act when URL actually changes
    if (!changeInfo.url) return;

    // If feature toggle is OFF → do nothing
    if (!await isEnabled()) return;

    const url = changeInfo.url;

    const isCoding = codingSites.some(site => url.includes(site));
    const isAI = aiSites.some(site => url.includes(site));

    //  Try opening an AI site while coding tab is already open → BLOCK AI
    if (isAI) {
        const codingOpen = await anyTabMatches(codingSites);
        if (codingOpen) {
            console.log("Blocked AI site because coding site is open:", url);
            browser.tabs.update(tabId, { url: "codeRedirect.html" });
            return;
        }
    }

    // Try opening a coding site while AI tab is already open → BLOCK coding
    if (isCoding) {
        const aiOpen = await anyTabMatches(aiSites);
        if (aiOpen) {
            console.log("Blocked coding site because AI site is open:", url);
            browser.tabs.update(tabId, { url: "codeRedirect.html" });
            return;
        }
    }
});