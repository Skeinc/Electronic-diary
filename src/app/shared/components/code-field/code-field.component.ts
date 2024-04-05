import { Component, ElementRef, Input, ViewChild } from "@angular/core";

@Component({
    selector: 'app-code-field',
    templateUrl: './code-field.component.html',
    styleUrl: './code-field.component.scss',
})
export class CodeFieldComponent {
    constructor(
        private elementRef: ElementRef,
    ) { }

    // Значение кода
    @Input() elementValue?: string | null;

    // DOM-элементы
    @ViewChild('codefieldFirst') codefieldFirst!: ElementRef;
    @ViewChild('codefieldSecond') codefieldSecond!: ElementRef;
    @ViewChild('codefieldThird') codefieldThird!: ElementRef;
    @ViewChild('codefieldFourth') codefieldFourth!: ElementRef;

    // Первое значение элемента
    codeFirstValue: string = '';

    // Второе значение элемента
    codeSecondValue: string = '';

    // Третье значение элемента
    codeThirdValue: string = '';

    // Четвертое значение элемента
    codeFourthValue: string = '';

    // Метод, который проверяет значение на максимальную длину
    checkMaxLenght(event: any): void {
        if (event.target.value.length > 0) {
            event.target.value = event.target.value.toString().slice(0, 0);
        }
    }

    // Метод вызывается при вводе символов в поле
    onInput(event: any, currentInput: HTMLInputElement): void {
        this.updateCodeValue();

        const value = event.target.value;

        if (value.length === 0) {
            this.onFocusHandler(currentInput, false);
        }
        else {
            this.onFocusHandler(currentInput, true);
        }
    }

    // Метод обработки фокус элемента
    onFocusHandler(currentInput: HTMLInputElement, nextElementFocus: boolean): void {
        const fields = [
            this.codefieldFirst.nativeElement,
            this.codefieldSecond.nativeElement,
            this.codefieldThird.nativeElement,
            this.codefieldFourth.nativeElement,
        ];

        const currentIndex = fields.indexOf(currentInput);

        if(nextElementFocus) {
            if (currentIndex < fields.length - 1) {
                fields[currentIndex + 1].focus();
            }
        }
        else {
            if(currentIndex > 0) {
                fields[currentIndex - 1].focus();

                switch(currentIndex) {
                    case 0:
                        this.codeFirstValue = '';
                        break;
                    case 1:
                        this.codeSecondValue = '';
                        break;
                    case 2:
                        this.codeThirdValue = '';
                        break;
                    case 3:
                        this.codeFourthValue = '';
                        break;
                    default:
                        break;
                }
            }
        }
    }

    // Метод для обновления значения кода
    updateCodeValue(): void {
        if(this.codeFirstValue && this.codeSecondValue && this.codeThirdValue && this.codeFourthValue) {
            this.elementValue = this.codeFirstValue?.toString() + this.codeSecondValue?.toString() + this.codeThirdValue?.toString() + this.codeFourthValue?.toString();
        }
    }
}