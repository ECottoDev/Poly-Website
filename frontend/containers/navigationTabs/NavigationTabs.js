import { addClasses, addEvent, appendChildren, createElementContainer, createParagraph } from "../../../helpers/basicElements.js";

export class NavigationTabs {
    constructor(tabsList, actions) {
        this.tabsList = tabsList;      // List of tab labels
        this.actions = actions;        // Array of functions for each tab
        this.view = addClasses(createElementContainer(), 'NavigationTabs_view');
        this.currentTab = 0;           // Keep track of the current active tab

        this.setView();
    }

    setView() {
        const tabElements = this.tabsList.map((tabName, index) => {
            const tab = addEvent(addClasses(createElementContainer(), `NavigationTabsView_tab`, `NavigationTabsView_tab-${index}`), () => this.changeTab(index));
            appendChildren(tab, [createParagraph(tabName)]);

            if (index === this.currentTab) {
                addClasses(tab, 'active-tab');
            }
            return tab;
        });

        appendChildren(this.view, tabElements);

        this.executeCurrentTabFunction();
    }

    changeTab(index) {
        const tabs = this.view.querySelectorAll('.NavigationTabsView_tab');
        tabs.forEach((tab, i) => {
            tab.classList.toggle('active-tab', i === index);
        });
        this.currentTab = index;
        this.executeCurrentTabFunction();
    }

    executeCurrentTabFunction() {
        let currentActions = this.actions[this.currentTab];
        if (!Array.isArray(currentActions)) {
            currentActions = [currentActions];
        }
        currentActions.forEach(action => action());
    }

}
