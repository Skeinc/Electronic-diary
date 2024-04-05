import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TextareaInterface } from "../../interfaces/components/textarea.interface";

@Component({
    selector: 'app-textarea',
    templateUrl: './textarea.component.html',
    styleUrl: './textarea.component.scss',
})
export class TextareaComponent {
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

    // Количество символов в строке элемента
    @Input() elementRows?: number;

    // Количество символов в столбце элемента
    @Input() elementCols?: number;

    // Изменение размера textarea
    @Input() resizable?: boolean;

    // Конфигурация компонента
    @Input() config?: TextareaInterface;
}