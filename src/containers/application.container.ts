import {Component, OnDestroy} from "@angular/core";
import {Store} from "@ngrx/store";
import {StoreLogMonitorComponent} from "@ngrx/store-log-monitor";
import {ApplicationState} from "../applicationState";
import {ADD_TWEET, REMOVE_TWEET, TOGGLE_STAR_TWEET, TOGGLE_TOPBAR, TOGGLE_SIDEBAR} from "../actions";
import {Tweet} from "../entities/tweet.entity";
import {SidebarComponent} from "../components/sidebar.component";
import {Subscription} from "rxjs/Rx";
import * as _ from "lodash";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "./application.container.scss";
import {ContentComponent} from "../components/content.component";
import {TopbarComponent} from "../components/topbar.component";

@Component({
    selector: "application",
    directives: [StoreLogMonitorComponent, SidebarComponent, TopbarComponent, ContentComponent],
    template: `        
        <sidebar [class.sidebar-collapsed]="sidebarCollapsed"
                 [isCollapsed]="sidebarCollapsed"
                 [starredTweets]="starredTweets"
                 (toggleCollapse)="onToggleCollapseSidebar()">
        </sidebar>
        <main>
            <topbar [class.topbar-collapsed]="topbarCollapsed"
                    [isCollapsed]="topbarCollapsed"   
                    (addTweet)="onAddTweet($event)"
                    (toggleCollapse)="onToggleCollapseTopbar()">
            </topbar>
            <content [tweets]="filteredTweets"
                     (search)="onSearch($event)"
                     (removeTweet)="onRemoveTweet($event)"
                     (toggleStarTweet)="onStarTweet($event)">
            </content>
        </main>
            `
})
export class ApplicationContainer implements OnDestroy {
    sidebarCollapsed = false;
    topbarCollapsed = false;
    starredTweets: Array<Tweet> = [];
    tweets: Array<Tweet> = [];
    filteredTweets: Array<Tweet> = [];

    private storeSubscription: Subscription;

    constructor(private store: Store<ApplicationState>) {
        this.storeSubscription = this.store.subscribe((state: ApplicationState) => {
            this.sidebarCollapsed = state.sidebarCollapsed;
            this.topbarCollapsed = state.topbarCollapsed;
            this.tweets = state.tweets;
            this.onSearch("");
            this.starredTweets = state.tweets.filter(tweet => tweet.starred);
        });
    }

    onAddTweet(content: string): void {
        let tweet = new Tweet(Number(_.uniqueId()), "@brechtbilliet", content, false);
        this.store.dispatch({type: ADD_TWEET, payload: {tweet}});
    }

    onRemoveTweet(id: number): void {
        this.store.dispatch({type: REMOVE_TWEET, payload: {id}});
    }

    onStarTweet(id: number): void {
        this.store.dispatch({type: TOGGLE_STAR_TWEET, payload: {id}});
    }

    onToggleCollapseTopbar(): void {
        this.store.dispatch({type: TOGGLE_TOPBAR});
    }

    onToggleCollapseSidebar(): void {
        this.store.dispatch({type: TOGGLE_SIDEBAR});
    }

    onSearch(term: string): void {
        this.filteredTweets = this.tweets.filter(tweet => tweet.content.toLowerCase().indexOf(term.toLowerCase()) > -1);
    }

    ngOnDestroy(): void {
        this.storeSubscription.unsubscribe();
    }
}
