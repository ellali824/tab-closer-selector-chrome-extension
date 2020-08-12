let currentActiveTab;

$(document).ready(function () {
    currentActiveTab = $("section.is-active");
    openChromeTabsTab()
    componentHandler.upgradeDom();
});

function openChromeTabsTab() {
     let $savedGroupWrapper = $("#save-new-group-wrapper");
   $savedGroupWrapper.show();
     chrome.windows.getAll({populate: true}, getAllOpenChromeTabs);
 }
