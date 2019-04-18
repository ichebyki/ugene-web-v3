import * as UgeneActions from '../../constants/ActionTypes';

const initialState = {
    tabkey: 1,
    workflowkey: 1,
    tabs: [{
        key: 1,
        workflowkey: 1,
        icon: 'home',
        name: 'Start Page',
        type: 'STARTPAGE',
        desc: 'This is a pane "Start Page"',
        pane: 'STARTPAGE',
        content: JSON.stringify({
            type: "UgeneStartPage",
            props: {},
            children: []
        })
    }]
};

export default function ReducerTabs(state = initialState, action) {

    if (action.type === UgeneActions.UgeneWindowAction) {
        if (action.command === UgeneActions.UgeneWindow.CREATE) {
            const tabkey = state.tabkey ? state.tabkey + 1 : 1;
            const tab = {
                key: tabkey,
                icon: 'sitemap',
                name: "Tab " + tabkey,
                type: 'WINDOW',
                desc: 'This is a content of the "Tab ' + tabkey + '"',
                pane: 'WINDOW',
                content: JSON.stringify({
                    type: 'div',
                    props: [],
                    content: 'This is a content of the pane "WINDOW"'
                })
            };

            if (state.tabs) {
                return {
                    ...state,
                    tabkey: tabkey,
                    tabs: [...state.tabs, tab]
                }
            } else {
                return {
                    ...state,
                    tabkey: tabkey,
                    tabs: [tab]
                }
            }
        }
        else if (action.command === UgeneActions.UgeneWindow.DELETE) {
            const tab2close = state.tabs.filter(tab => tab.key === action.tabkey);

            if (action.tabkey
                && action.tabkey > 0
                && action.tabkey <= state.tabkey
                && tab2close[0]
                && (tab2close[0].type === "WINDOW" || tab2close[0].type === "STARTPAGE")) {
                return {
                    ...state,
                    tabs: state.tabs.filter(tab => tab.key !== action.tabkey)
                }
            }
            else {
                console.error("ERROR: Wrong tab '" + JSON.stringify(action) + "' while closing tab");
            }
        }
    }
    /*************************************** Workflows ********************************************/
    else if (action.type === UgeneActions.UgeneWorkflowAction) {
        if (action.command === UgeneActions.UgeneWorkflow.CREATE) {
            const tabkey = state.tabkey ? state.tabkey + 1 : 1;
            const workflowkey = state.workflowkey ? state.workflowkey + 1 : 1;
            const tab = {
                key: tabkey,
                icon: 'sitemap',
                name: "Workflow " + workflowkey,
                type: 'WORKFLOW',
                desc: 'This is a content of the "Workflow ' + workflowkey + '"',
                pane: 'WORKFLOW',
                content: JSON.stringify({
                                            type: "StaticResult",
                                            props: {},
                                            children: []
                                        })
            };

            if (state.tabs) {
                return {
                    ...state,
                    tabkey: tabkey,
                    workflowkey: workflowkey,
                    tabs: [...state.tabs, tab]
                }
            } else {
                return {
                    ...state,
                    tabkey: tabkey,
                    workflowkey: workflowkey,
                    tabs: [tab]
                }
            }
        }
        else if (action.command === UgeneActions.UgeneWorkflow.DELETE) {
            const tab2close = state.tabs.filter(tab => tab.key === action.tabkey);

            if (action.tabkey
                && action.tabkey > 0
                && action.tabkey <= state.tabkey
                && tab2close[0]
                && tab2close[0].type === "WORKFLOW") {
                return {
                    ...state,
                    tabs: state.tabs.filter(tab => tab.key !== action.tabkey)
                }
            }
            else {
                console.error("ERROR: Wrong tab '" + JSON.stringify(action) + "' while closing tab");
            }
        }
    }
    /*************************************** Static result ********************************************/
    else if (action.type === UgeneActions.StaticResultAction) {
        let app = action.app;
        if (action.command === UgeneActions.UgeneWorkflow.CREATE) {
            const tabkey = state.tabkey ? state.tabkey + 1 : 1;
            const workflowkey = state.workflowkey ? state.workflowkey + 1 : 1;
            const tab = {
                key: tabkey,
                icon: 'sitemap',
                name: "Static result - " + app.name,
                type: 'WORKFLOW', /* TODO */
                desc: 'This is a content of the "Static result ' + app.id + '"',
                pane: 'WORKFLOW', /* TODO */
                content: JSON.stringify({
                                            type: "StaticResult",
                                            props: {app: app},
                                            children: []
                                        })
            };

            if (state.tabs) {
                return {
                    ...state,
                    tabkey: tabkey,
                    workflowkey: workflowkey,
                    tabs: [...state.tabs, tab]
                }
            } else {
                return {
                    ...state,
                    tabkey: tabkey,
                    workflowkey: workflowkey,
                    tabs: [tab]
                }
            }
        }
        else if (action.command === UgeneActions.UgeneWorkflow.DELETE) {
            const tab2close = state.tabs.filter(tab => tab.key === action.tabkey);

            if (action.tabkey
                && action.tabkey > 0
                && action.tabkey <= state.tabkey
                && tab2close[0]
                && tab2close[0].type === "WORKFLOW") {
                return {
                    ...state,
                    tabs: state.tabs.filter(tab => tab.key !== action.tabkey)
                }
            }
            else {
                console.error("ERROR: Wrong tab '" + JSON.stringify(action) + "' while closing tab");
            }
        }
    }
    return state;
}