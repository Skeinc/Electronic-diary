import { Component, Input } from "@angular/core";
import { ButtonInterface } from "../../interfaces/components/button.interface";

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
})
export class ButtonComponent {
    // ID элемента
    @Input() elementID?: string | null = null;

    // Name элемента
    @Input() elementName?: string | null = null;

    // Label элемента
    @Input() elementLabel?: string  | null = null;

    // Disable параметр элемента
    @Input() elementDisable?: boolean;

    // Конфигурация компонента
    @Input() config?: ButtonInterface;
}