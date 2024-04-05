import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
    @Output() elementValueChange = new EventEmitter<any>();

    // ID элемента
    @Input() elementID?: string | null = null;

    // Name элемента
    @Input() elementName?: string | null = null;

    // Label элемента
    @Input() elementLabel?: string  | null = null;

    // Value элемента
    @Input() elementValue?: any  | null = null;

    // Placeholder элемента
    @Input() elementPlaceholder?: string  | null = null;

    // Required параметр элемента
    @Input() elementRequired?: boolean;

    // Disable параметр элемента
    @Input() elementDisable?: boolean;

    // Valid параметр элемента
    @Input() elementValid?: boolean;

    // Варианты выпадающего списка
    @Input() options?: any[];

    // Label у вариантов выпадающего списка
    @Input() optionsLabel?: string | null;

    // Value у выбранного элемента
    @Input() optionsValue?: string | null;

    // Определяет будет ли возможность очистки значения
    @Input() clearOption?: boolean;

    // Определяет будет ли присутствовать фильтр
    @Input() filter?: boolean;

    // Переменная, контролирующая видимость выпадающего списка
    isDropdownVisible: boolean = false;

    // Переменная содержит отфильтрованные элементы выпадающего списка
    filteredOptions: any[] = [];

    // Метод для контролирования видимости выпадающего списка
    toggleDropdownVisible(): void {
        this.isDropdownVisible = !this.isDropdownVisible;
        if (this.isDropdownVisible && this.filter) {
            this.filteredOptions = this.options ? [...this.options] : [];
        }
    }

    // Метод для выбора элемента и установки его в ngModel
    selectOption(option: any): void {
        this.elementValue = option;
        this.elementValueChange.emit(this.elementValue);
        this.isDropdownVisible = false;
    }

    // Метод для очищения выбранного элемента
    clearValue(): void {
        this.elementValue = '';
    }

    // Фильтрация данных
    filterOptions(event: any): void {
        const searchText = event.target.value.toLowerCase();
        this.filteredOptions = this.options ? this.options.filter(option => {
            if (typeof option === 'object') {
                if (this.optionsLabel && option[this.optionsLabel]) {
                    return (option[this.optionsLabel].toLowerCase()).includes(searchText);
                }
            } else {
                return (option.toLowerCase()).includes(searchText);
            }
            return false;
        }) : [];
    }
}