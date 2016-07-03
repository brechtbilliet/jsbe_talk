import {Tweet} from "./entities/tweet.entity";
export interface ApplicationState {
    tweets: Array<Tweet>;
    sidebarCollapsed: boolean;
    topbarCollapsed: boolean;
}