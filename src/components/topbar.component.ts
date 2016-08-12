import {Component, Output, EventEmitter, Input, ChangeDetectionStrategy} from "@angular/core";
import {REACTIVE_FORM_DIRECTIVES, FormControl} from "@angular/forms";
import {FORM_DIRECTIVES} from "@angular/common";
@Component({
    selector: "topbar",
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES],
    template: `
        <div class="collapsed-content" *ngIf="!isCollapsed">
            <h1><i class="fa fa-twitter"></i>&nbsp;Post a new tweet!</h1>
            <textarea class="form-control" [(ngModel)]="tweetContent" [formControl]="contentCtrl"></textarea><br/>
            <button [disabled]="tweetContent === ''" (click)="onAddTweet()"
                class="btn btn-primary btn-lg"><i class="fa fa-envelope"></i>&nbsp;Post
            </button>
        </div>
        <i (click)="onToggle()" class="fa nf-collapse nf-collapse-center"
            [class.fa-chevron-up]="!isCollapsed" [class.fa-chevron-down]="isCollapsed"></i>
`
})
export class TopbarComponent {
    @Input() isCollapsed: boolean;
    @Output() addTweet = new EventEmitter<string>();
    @Output() toggleCollapse = new EventEmitter<any>();

    tweetContent: string = "";
    contentCtrl = new FormControl();

    onAddTweet(): void {
        this.addTweet.emit(this.tweetContent);
        this.tweetContent = "";
    }

    onToggle(): void {
        this.toggleCollapse.emit(null);
    }
}