import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from "@angular/core";
@Component({
    selector: "star",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <i class="fa fa-star fa-2x" [class.starred]="starred" (click)="onToggle()"></i>
`
})
export class StarComponent {
    @Input() starred: boolean;
    @Output() toggle = new EventEmitter<any>();

    onToggle(): void {
        this.toggle.emit(null);
    }
}