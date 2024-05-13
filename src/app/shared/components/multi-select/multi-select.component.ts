import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-multiselect',
    templateUrl: './multi-select.component.html',
    styleUrl: './multi-select.component.scss',
})
export class MultiSelectComponent {
    @Output() elementValueChange = new EventEmitter<any>();

    // ID элемента
    @Input() elementID?: string | null = null;

    // Name элемента
    @Input() elementName?: string | null = null;

    // Label элемента
    @Input() elementLabel?: string | null = null;

    // Value элемента
    @Input() elementValue?: any[] | null = null;

    // Placeholder элемента
    @Input() elementPlaceholder?: string | null = null;

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
    @Input() optionsValue?: any | null;

    // Определяет будет ли возможность очистки значения
    @Input() clearOption?: boolean;

    // Определяет будет ли присутствовать фильтр
    @Input() filter?: boolean;

    // Переменная, контролирующая видимость выпадающего списка
    isMultiselectVisible: boolean = false;

    // Переменная содержит отфильтрованные элементы выпадающего списка
    filteredOptions: any[] = [];

    // Метод для контролирования видимости выпадающего списка
    toggleMultiselectVisible(): void {
        this.isMultiselectVisible = !this.isMultiselectVisible;
        if (this.isMultiselectVisible && this.filter) {
            this.filteredOptions = this.options ? [...this.options] : [];
        }
    }

    // Метод для выбора элемента и установки его в ngModel
    selectOption(option: any): void {
        if (this.elementValue === null || this.elementValue?.length === 0) {
            this.elementValue = [];
        };

        const optionIndex = this.elementValue?.findIndex((el: any) => el.id === option.id);

        if (optionIndex !== -1) {
            this.isMultiselectVisible = false;
        } else {
            this.elementValue?.push(option);
            this.elementValueChange.emit(this.elementValue);
            this.isMultiselectVisible = false;
        }
    }

    // Метод для очищения выбранного элемента
    clearValue(): void {
        this.elementValue = [];
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

    // Метод, который возвращает строку, содержащую выбранные данные
    selectedOptionsText(): string {
        if (!this.elementValue || this.elementValue.length === 0) {
            return '';
        }

        return this.elementValue.map(item => item[this.optionsLabel!]).join(', ');
    }
}