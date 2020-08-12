chrome.extension.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        if (msg === "RELOAD_CONTEXT_MENU") {
            refreshContextMenu()
        }
    });
});
function refreshContextMenu() {
    chrome.storage.largeSync.get(["tabGroups"], function (chromeResult) {
        contextMenuChild.forEach(function (child) {
            chrome.contextMenus.remove(child);
        });
        contextMenuChild = [];
        if (undefined !== chromeResult.tabGroups && chromeResult.tabGroups.length > 0) {
            chromeResult.tabGroups.forEach(function (elem) {
                contextMenuChild.push(
                    chrome.contextMenus.create({
                        "title": elem.name,
                        "parentId": parentContextMenu,
                        "onclick": function (tab, link) {
                            addNewLinkToGroup(
                                {
                                    name: link.title,
                                    link: link.url,
                                    icon: link.favIconUrl
                                },
                                elem.name
                            )
                        }
                    })
                );
            });
        }
    });
}
