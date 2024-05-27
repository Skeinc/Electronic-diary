import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-number-field',
    templateUrl: './number-field.component.html',
    styleUrl: './number-field.component.scss',
})
export class NumberFieldComponent {
    @Output() elementValueChange = new EventEmitter<string>();

    // ID элемента
    @Input() elementID?: string | null = null;

    // Name элемента
    @Input() elementName?: string | null = null;

    // Label элемента
    @Input() elementLabel?: string  | null = null;

    // Value элемента
    @Input() elementValue?: string | null = null;

    // Максимальное значение у поля
    @Input() maxValue?: number | null = null;

    // Минимальное значение у поля
    @Input() minValue?: number | null = null;

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

    // Метод проверяет, что вводятся только цифры
    isNumericInput(event: KeyboardEvent): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            // Не является цифрой
            event.preventDefault();
            return false;
        }
        return true;
    }

}