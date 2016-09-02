import {Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnDestroy, OnInit} from "@angular/core";
import {Tweet} from "../entities/tweet.entity";
import {Subscription} from "rxjs/Rx";
import {FormControl} from "@angular/forms";
@Component({
    selector: "content",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <h2>Feed</h2>
        <p>These are the most recent tweets:</p>
        <input type="text" class="form-control" [formControl]="searchCtrl" >
        <div class="nf-tweets">
            <div class="row nf-tweet" *ngFor="let tweet of tweets">
                <div class="col-sm-8">
                    <h3>{{tweet.userName}} Tweeted</h3>
                    <p>{{tweet.content}}</p>
                </div>
                <div class="col-sm-2">
                    <star [starred]="tweet.starred" (toggle)="onToggleStar(tweet)" class="pull-right"></star>
                </div>
                <div class="col-sm-2">
                    <button class="btn btn-danger pull-right" (click)="onRemoveTweet(tweet)">
                        <i class="fa fa-trash-o"></i>
                    </button>
                </div>
            </div>
        </div>
`
})
export class ContentComponent implements OnDestroy, OnInit {
    @Input() tweets: Array<Tweet>;
    @Output() toggleStarTweet = new EventEmitter<number>();
    @Output() removeTweet = new EventEmitter<number>();
    @Output() search = new EventEmitter<string>();

    searchCtrl = new FormControl();

    private subscriptions: Array<Subscription> = [];

    ngOnInit(): void {
        this.subscriptions.push(this.searchCtrl.valueChanges.subscribe((term: string) => this.search.emit(term)));
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    onToggleStar(tweet: Tweet): void {
        this.toggleStarTweet.emit(tweet.id);
    }

    onRemoveTweet(tweet: Tweet): void {
        this.removeTweet.emit(tweet.id);
    }

    onSearch(term: string): void {
        console.log(term);
    }
}