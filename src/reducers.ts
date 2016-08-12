import {Tweet} from "./entities/tweet.entity";
import {Action} from "@ngrx/store";
import {TOGGLE_SIDEBAR, TOGGLE_TOPBAR, ADD_TWEET, SET_TWEETS, REMOVE_TWEET, TOGGLE_STAR_TWEET} from "./actions";
import _ = require("lodash");
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

let tweets: Array<Tweet> = [];
for (let i = 0; i < 10; i++) {
    tweets.push(new Tweet(Number(_.uniqueId()), "@brechtbilliet", `Just a dummy tweet ${i}`, false));
}
function tweetsReducer(state: Array<Tweet> = tweets, action: Action): Array<Tweet> {
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