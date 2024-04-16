import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
    @Input() visibleController?: boolean;
    @Output() next: EventEmitter<void> = new EventEmitter<void>();
    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

    onNext(): void {
        this.next.emit();
    }

    onCancel(): void {
        this.cancel.emit();
    }
}