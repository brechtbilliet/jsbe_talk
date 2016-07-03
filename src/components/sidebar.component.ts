import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from "@angular/core";
import {Tweet} from "../entities/tweet.entity";
@Component({
    selector: "sidebar",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div [class.sidebar-collapsed]="isCollapsed">
            <div>
                <i (click)="onToggle()" class="fa nf-collapse nf-collapse-right"
                   [class.fa-chevron-left]="!isCollapsed"
                   [class.fa-chevron-right]="isCollapsed"></i>
                <div class="collapsed-content">
                    <h2>Starred tweets</h2>
                    <p>Here we have an overview of our starred tweets</p>
                    <div *ngFor="let tweet of starredTweets">
                        {{tweet.userName}} has tweeted {{tweet.content}}
                    </div>
                </div>
            </div>
        </div>
`
})
export class SidebarComponent {
    @Input() isCollapsed: boolean;
    @Input() starredTweets: Array<Tweet>;
    @Output() toggleCollapse = new EventEmitter<any>();

    onToggle(): void {
        this.toggleCollapse.emit(null);
    }
}