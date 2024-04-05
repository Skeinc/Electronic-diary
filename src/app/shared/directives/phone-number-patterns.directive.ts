import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appPhoneNumberPattern]',
})
export class PhoneNumberPatternDirective {
    @Input() appPhoneNumberPattern: string[] = [];

    constructor(private el: ElementRef) { }

    // Обработчик события ввода для элемента ввода
    @HostListener('input', ['$event'])
    onInput(event: InputEvent): void {
        const input = event.target as HTMLInputElement;
        const inputValue = input.value.replace(/\D/g, '');
        const mask = this.getMask(inputValue);
        const maskedValue = this.formatNumberWithMask(inputValue, mask);
        input.value = maskedValue;
    }

    // Метод для получения маски форматирования номера телефона
    private getMask(phone: string): string {
        const maskList = this.appPhoneNumberPattern.filter((e) =>
            phone.startsWith(e.replace(/\D/g, ''))
        );
        return maskList.length > 0
            ? maskList[0].replace(/\d/g, '#')
            : '+# (###) ###-##-##';
    }

    // Метод для форматирования номера телефона с использованием маски
    private formatNumberWithMask(phone: string, mask: string): string {
        let formattedNumber = '';
        let phoneIndex = 0;
        for (let i = 0; i < mask.length && phoneIndex < phone.length; i++) {
            if (mask[i] === '#') {
                formattedNumber += phone[phoneIndex];
                phoneIndex++;
            } else {
                formattedNumber += mask[i];
            }
        }
        return formattedNumber;
    }
}