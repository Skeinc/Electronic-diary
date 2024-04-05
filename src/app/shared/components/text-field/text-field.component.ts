import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TextFieldInterface } from "../../interfaces/components/text-field.interface";

@Component({
    selector: 'app-text-field',
    templateUrl: './text-field.component.html',
    styleUrl: './text-field.component.scss',
})
export class TextFieldComponent {
    @Output() elementValueChange = new EventEmitter<string>();
    
    // ID элемента
    @Input() elementID?: string | null = null;

    // Name элемента
    @Input() elementName?: string | null = null;

    // Label элемента
    @Input() elementLabel?: string  | null = null;

    // Value элемента
    @Input() elementValue?: string  | null = null;

    // Placeholder элемента
    @Input() elementPlaceholder?: string  | null = null;

    // Required параметр элемента
    @Input() elementRequired?: boolean;

    // Readonly параметр элемента
    @Input() elementReadonly?: boolean;

    // Disable параметр элемента
    @Input() elementDisable?: boolean;

    // Valid параметр элемента
    @Input() elementValid?: boolean;

    // Конфигурация компонента
    @Input() config?: TextFieldInterface;
}