import { Component, Input } from "@angular/core";
import { PasswordFieldInterface } from "../../interfaces/components/password-field.interface";

@Component({
    selector: 'app-password-field',
    templateUrl: './password-field.component.html',
    styleUrl: './password-field.component.scss',
})
export class PasswordFieldComponent {
    // Конфигурация компонента
    @Input() config!: PasswordFieldInterface;

    // Переменная, контролирующая видимость пароля
    isVisiblePassword: boolean = false;

    // Метод для смены видимости пароля
    togglePasswordVisible(): void {
        this.isVisiblePassword = !this.isVisiblePassword;
    }
}