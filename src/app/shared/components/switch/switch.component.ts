import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-switch',
    templateUrl: './switch.component.html',
    styleUrl: './switch.component.scss',
})
export class SwitchComponent {
    // ID элемента
    @Input() elementID?: string | null = null;

    // Value элемента
    @Input() elementValue!: boolean;

    // Disable параметр элемента
    @Input() elementDisable?: boolean;

    // Изменяем значение элемента
    toggleSwitchValue(): void {
        this.elementValue = !this.elementValue;
    }
}