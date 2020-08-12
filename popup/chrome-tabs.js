
function getAllOpenChromeTabs(winData) {
    $("#tab-list").empty();

    let windowLinks = extractLinksFromWindowData(winData);
    windowLinks.forEach(function (window) {
        $("#tab-list")
            .append(getWindowTableTemplate(window));
        componentHandler.upgradeAllRegistered();
    });
    showTabs();
    selectCloseTab();
    closeAllTabsInWindow();
   
}
//select or close a tab
function selectCloseTab() {
    $(".tab-row").on("click", function(){
        let id = parseInt($(this).find(".tab-id").val());

        chrome.tabs.update(id,{"active":true,"highlighted":true});

    })
    $(".bi").on("click",function(){
        let id = parseInt($(this).parent().closest(".tab-row").find(".tab-id").val());
        
            let row = $(this).parent().closest(".tab-row")
            $(row).remove();
            chrome.tabs.remove(id);
    })
}

//show all the tabs
function showTabs() {

    let $allchromeTabs = $($(".window-header-row").parents("table").find(".window-tabs-list-wrapper"));
    $allchromeTabs.each(function(index, chromeTabs) {
            $(chromeTabs).show()
    })
}

//close all tabs in a window 
function closeAllTabsInWindow() {
    
    $(".window-bi").on("click",function(){

        let $row = $($(this).parent().closest("table").find("tbody").find(".tab-row")); 
        $row.each(function (index, num){
            let id = parseInt($(num).find(".tab-id").val());
            
            chrome.tabs.remove(id);
        })
        $(this).parent().closest("table").find("tbody").remove();      
        $(this).parent().closest("table").find("thead").remove();   
    })
}

function extractLinksFromWindowData(winData) {
    let windowLinks = [];
    for (let i in winData) {
        let winTabs = winData[i].tabs;
        let totTabs = winTabs.length;
        let links = [];
        for (let j = 0; j < totTabs; j++) {
            links.push(new Link().init1(winTabs[j].id, winTabs[j].title, winTabs[j].url, winTabs[j].favIconUrl))
        }
        let windowNumber = (parseInt(i) + 1);
        windowLinks.push({windowName: "Window " + windowNumber, links: links})
    }
    return windowLinks;
}

//template for window 
function getWindowTableTemplate(window) {
    let windowTableTBody = $("<tbody/>");

    window.links.forEach(function (link) {
        windowTableTBody
            .append(getTabTemplate(link))
            .addClass("window-tabs-list-wrapper"); 
    });
    return $("<table/>").addClass("mdl-data-table mdl-js-data-table window-tabs-container").append(
        $("<thead/>").append(

            $("<tr/>").append(

                $("<th/>").append(
                    $("<img/>")
                        .addClass("tab-image window-image")
                        .attr({"src": "../images/window.png"})
                ).addClass("tab-image-table-row")

            ).append(

                $("<th/>")
                    .addClass("tab-text-head")
                    .text(window.windowName)
                    .append(
                        $("<span/>")
                            .addClass("window-additional-images")
                    )
                    
            ).append(
                $("<th/>").append(
                    $("<img/>").addClass("window-bi x-image").attr({id: "close-all-tab-rows", "src": "../images/x.png"}).append( 
                        $("<img/>").attr({type: "x"}).addClass("close-tab")
                    )
                ).addClass("window-x")
            ).addClass("window-header-row")
        )
    ).append(
        windowTableTBody
    );
}

// template for tab
function getTabTemplate(link) {

    let tabRow = $("<tr/>").addClass("tab-row");
    
    tabRow.append(
        $("<td/>").append(
            $("<svg/>")
                .addClass("bi")
                .append(
                    $("<img/>")
                        .attr({type: "x", "src": "../images/x.png"})
                        .addClass("close-tab x-image")
                )
        )
    );
    
    tabRow.append(
        $("<td/>").append(
            $("<img/>")
                .addClass("tab-image icons")
                .attr({src: link.icon})
        )
    );
    tabRow.append(
        $("<td/>")
            .attr({title: link.name})
            .addClass("tab-text")
            .text(link.name)
    );
    tabRow.append(
        $("<input/>")
            .attr({hidden: "hidden"})
            .addClass("tab-url")
            .val(link.link)
    );
    tabRow.append(
        $("<input/>")
            .attr({hidden: "hidden"})
            .addClass("tab-id")
            .val(link.id)
    );
    componentHandler.upgradeDom();
    componentHandler.upgradeAllRegistered();
    return tabRow;
}
