function PaneTabTracker(fileFieldParent, path) {
    this.activePane = new Pane(path);
    this.panes = [this.activePane];
    this.element = fileFieldParent;

    fileFieldParent.appendChild(this.activePane.fileField);


    this.removeTab = (event) => {
        let tabIndex = Tracker.tabIndex(event.target);
        console.log(tabIndex);
        let pane = Tracker.findPane(event.target);
        let activeTabWasErased = (this.activePane.tabs[tabIndex] == this.activePane.activeTab);
        $(pane.tabs[tabIndex].element).remove();
        pane.tabs.splice(tabIndex, 1);

        if (pane.tabs.length <= 0) {
            this.panes.splice(this.panes.indexOf(pane), 1);
        } else if (activeTabWasErased) {
            pane.setActiveTab(pane.tabs[0].element);
        }
    };

    this.folder = function () {
        return this.activePane.activeTab.folder;
    };

    this.refresh = function () {
        for (let pane of this.panes) {
            pane.refresh();
        }
    };

    this.addPane = function (path) {
        console.log('one');
        let newPane = new Pane(path);
        this.panes.push(newPane);
        newPane.refresh();
        this.element.appendChild(newPane.fileField);
        adjustFileFieldParentCss();
    };

    this.findPane = function (node) {
        for (let pane of this.panes) {
            console.log($(node).parents())
            for (let parent of $(node).parents()) {
                if (parent == pane.fileField) {
                    return pane;
                }
            }
            console.error('could\'t find pane');
        }
    };

    this.tabIndex = function (node) {
        if (node.parentNode.classList.contains('tab')) {
            node = node.parentNode;
        }

        let pane = this.findPane(node);
        for (let k in pane.tabs) {
            if (pane.tabs[k].element == node) {
                return k;
            }
        }
    };

    this.findTab = function (node) {
        let index = this.tabIndex(node);
        return this.findPane(node).tabs[index];
    };
};
