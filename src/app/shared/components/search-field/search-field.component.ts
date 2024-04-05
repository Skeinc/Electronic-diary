import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SearchFieldInterface } from "../../interfaces/components/search-field.interface";

@Component({
    selector: 'app-search-field',
    templateUrl: './search-field.component.html',
    styleUrl: './search-field.component.scss',
})
export class SearchFieldComponent {
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
    @Input() config?: SearchFieldInterface;

    // Метод обработки ввода
    onSearchField(event: any): void {
        this.elementValue = event.target.value;
    }

    // Метод для очистки поля ввода
    clearSearchField(): void {
        this.elementValue = '';
    }
}