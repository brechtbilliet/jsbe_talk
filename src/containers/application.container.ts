import {Component} from "@angular/core";
import {StoreLogMonitorComponent} from "@ngrx/store-log-monitor";
import {Tweet} from "../entities/tweet.entity";
import {SidebarComponent} from "../components/sidebar.component";
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
export class ApplicationContainer {
    sidebarCollapsed = false;
    topbarCollapsed = false;
    starredTweets: Array<Tweet> = [];
    tweets: Array<Tweet> = [];
    filteredTweets: Array<Tweet> = [];

    constructor() {
        for (let i = 0; i < 10; i++) {
            this.tweets.push(new Tweet(Number(_.uniqueId()), "@brechtbilliet", `Just a dummy tweet ${i}`, false));
            this.onSearch("");
        }
        this.calculateStarredTweets();
    }

    onAddTweet(content: string): void {
        let tweet = new Tweet(Number(_.uniqueId()), "@brechtbilliet", content, false);
        this.tweets.push(tweet);
        this.calculateStarredTweets();
        this.filteredTweets = this.tweets;
    }

    onRemoveTweet(id: number): void {
        this.tweets = this.tweets.filter(tweet => tweet.id !== id);
        this.calculateStarredTweets();
        this.filteredTweets = this.tweets;
    }

    onStarTweet(id: number): void {
        this.tweets = this.tweets.map(tweet => tweet.id === id ? Object.assign(tweet, {starred: !tweet.starred}) : tweet);
        this.calculateStarredTweets();
    }

    onToggleCollapseTopbar(): void {
        this.topbarCollapsed = !this.topbarCollapsed;
    }

    onToggleCollapseSidebar(): void {
        this.sidebarCollapsed = !this.sidebarCollapsed;
    }

    onSearch(term: string): void {
        this.filteredTweets = this.filterTweets(this.tweets, term);
    }

    private filterTweets(tweets: Array<Tweet>, term: string): Array<Tweet> {
        return tweets.filter(tweet => tweet.content.toLowerCase().indexOf(term.toLowerCase()) > -1);
    }

    private calculateStarredTweets(): void {
        this.starredTweets = this.tweets.filter(tweet => tweet.starred);
    }
}
