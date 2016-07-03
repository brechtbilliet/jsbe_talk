import {Tweet} from "./entities/tweet.entity";
import {Action} from "@ngrx/store";
import {TOGGLE_SIDEBAR, TOGGLE_TOPBAR, ADD_TWEET, SET_TWEETS, REMOVE_TWEET, TOGGLE_STAR_TWEET} from "./actions";
export const rootReducer = {
    sidebarCollapsed: sidebarReducer,
    topbarCollapsed: topbarReducer,
    tweets: tweetsReducer
}

function sidebarReducer(state: boolean = false, action: Action): boolean {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return !state;
        default:
            return state;
    }
}
function topbarReducer(state: boolean = false, action: Action): boolean {
    switch (action.type) {
        case TOGGLE_TOPBAR:
            return !state;
        default:
            return state;
    }
}

function tweetsReducer(state: Array<Tweet> = [], action: Action): Array<Tweet> {
    switch (action.type) {
        case ADD_TWEET:
            return [...state, action.payload.tweet];
        case REMOVE_TWEET:
            return state.filter(tweet => tweet.id !== action.payload.id)
        case TOGGLE_STAR_TWEET:
            return state.map(tweet => tweet.id === action.payload.id ?
                Object.assign({}, tweet, {starred: !tweet.starred}) : tweet);
        case SET_TWEETS:
            return [...action.payload.tweets];
        default:
            return state;
    }
}